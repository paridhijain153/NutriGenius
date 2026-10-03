import AppError from "../../common/errors/app-error.js";
import foodRepository from "./food.repository.js";
import { FOOD_MESSAGES } from "./food.constants.js";

class FoodService {
    async createFood(foodData) {
        const name = foodData.name.trim();

        const existingFood = await foodRepository.findFoodByName(name);

        if (existingFood) {
            throw new AppError(FOOD_MESSAGES.ALREADY_EXISTS, 409);
        }

        return foodRepository.createFood({
            ...foodData,
            name,
        });
    }

    async getFoods(query) {
        const { page, limit } = query;

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            foodRepository.findFoods(skip, limit),
            foodRepository.countFoods(),
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

    async getFoodById(foodId) {
        const food = await foodRepository.findFoodById(foodId);

        if (!food) {
            throw new AppError(FOOD_MESSAGES.NOT_FOUND, 404);
        }

        return food;
    }

    async searchFoods(query) {
        return foodRepository.searchFoods(query.trim());
    }

    async updateFood(foodId, foodData) {
        await this.getFoodById(foodId);

        if (foodData.name) {
            const name = foodData.name.trim();

            const existingFood = await foodRepository.findFoodByName(name);

            if (existingFood && existingFood.id !== foodId) {
                throw new AppError(FOOD_MESSAGES.ALREADY_EXISTS, 409);
            }

            foodData = {
                ...foodData,
                name,
            };
        }

        return foodRepository.updateFood(foodId, foodData);
    }

    async deleteFood(foodId) {
        await this.getFoodById(foodId);

        await foodRepository.deleteFood(foodId);
    }
}

export default new FoodService();