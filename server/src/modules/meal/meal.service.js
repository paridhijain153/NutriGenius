import AppError from "../../common/errors/app-error.js";
import mealRepository from "./meal.repository.js";

const toDate = (value) => (value ? new Date(value) : undefined);

const buildMealFilter = ({ mealType, analysisStatus, dateFrom, dateTo }) => {
    const where = {};

    if (mealType) {
        where.mealType = mealType;
    }

    if (analysisStatus) {
        where.analysisStatus = analysisStatus;
    }

    if (dateFrom || dateTo) {
        where.loggedAt = {};

        if (dateFrom) {
            where.loggedAt.gte = new Date(dateFrom);
        }

        if (dateTo) {
            where.loggedAt.lte = new Date(dateTo);
        }
    }

    return where;
};

const normalizeMealData = (mealData) => ({
    ...mealData,
    loggedAt: toDate(mealData.loggedAt),
});

const sumMealNutrition = (meal) => {
    const itemTotals = meal.mealItems.reduce(
        (totals, item) => ({
            calories: totals.calories + Number(item.calories || 0),
            protein: totals.protein + Number(item.protein || 0),
            carbs: totals.carbs + Number(item.carbs || 0),
            fat: totals.fat + Number(item.fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    return {
        calories: Number(meal.totalCalories ?? itemTotals.calories ?? 0),
        protein: Number(meal.totalProtein ?? itemTotals.protein ?? 0),
        carbs: Number(meal.totalCarbs ?? itemTotals.carbs ?? 0),
        fat: Number(meal.totalFat ?? itemTotals.fat ?? 0),
    };
};

class MealService {
    async createMeal(userId, mealData) {
        return mealRepository.createMeal({
            ...normalizeMealData(mealData),
            userId,
        });
    }

    async getMeals(userId, query) {
        const { page, limit, ...filters } = query;
        const where = buildMealFilter(filters);
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            mealRepository.findMeals(userId, where, skip, limit),
            mealRepository.countMeals(userId, where),
        ]);

        return {
            items,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getMealById(userId, mealId) {
        const meal = await mealRepository.findMealByIdForUser(mealId, userId);

        if (!meal) {
            throw new AppError("Meal not found.", 404);
        }

        return meal;
    }

    async updateMeal(userId, mealId, mealData) {
        await this.getMealById(userId, mealId);

        return mealRepository.updateMeal(
            mealId,
            userId,
            normalizeMealData(mealData)
        );
    }

    async deleteMeal(userId, mealId) {
        await this.getMealById(userId, mealId);

        await mealRepository.deleteMeal(mealId, userId);
    }

    async getDailySummary(userId, date) {
        const selectedDate = date ? new Date(date + "T00:00:00.000Z") : new Date();
        const start = new Date(selectedDate);
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + 1);

        const meals = await mealRepository.findMeals(
            userId,
            {
                loggedAt: {
                    gte: start,
                    lt: end,
                },
            },
            0,
            100
        );

        const totals = meals.reduce(
            (summary, meal) => {
                const mealTotals = sumMealNutrition(meal);

                return {
                    calories: summary.calories + mealTotals.calories,
                    protein: summary.protein + mealTotals.protein,
                    carbs: summary.carbs + mealTotals.carbs,
                    fat: summary.fat + mealTotals.fat,
                };
            },
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );

        return {
            date: start.toISOString().slice(0, 10),
            mealCount: meals.length,
            totals,
            meals,
        };
    }
}

export default new MealService();
