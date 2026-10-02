import prisma from "../../database/prisma.js";

const mealInclude = {
    mealItems: {
        include: {
            food: true,
        },
    },
    mealImages: true,
};

class MealRepository {
    async createMeal(data) {
        return prisma.meal.create({
            data,
            include: mealInclude,
        });
    }

    async findMealByIdForUser(id, userId) {
        return prisma.meal.findFirst({
            where: {
                id,
                userId,
            },
            include: mealInclude,
        });
    }

    async findMeals(userId, where = {}, skip = 0, take = 10) {
        return prisma.meal.findMany({
            where: {
                userId,
                ...where,
            },
            orderBy: {
                loggedAt: "desc",
            },
            skip,
            take,
            include: mealInclude,
        });
    }

    async countMeals(userId, where = {}) {
        return prisma.meal.count({
            where: {
                userId,
                ...where,
            },
        });
    }

    async updateMeal(id, userId, data) {
        await prisma.meal.updateMany({
            where: {
                id,
                userId,
            },
            data,
        });

        return this.findMealByIdForUser(id, userId);
    }

    async deleteMeal(id, userId) {
        return prisma.meal.deleteMany({
            where: {
                id,
                userId,
            },
        });
    }
}

export default new MealRepository();
