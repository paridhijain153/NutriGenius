import prisma from "../../database/prisma.js";

class FoodRepository {
    async createFood(data) {
        return prisma.food.create({
            data,
        });
    }

    async findFoodById(id) {
        return prisma.food.findUnique({
            where: {
                id,
            },
        });
    }

    async findFoodByName(name) {
        return prisma.food.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        });
    }

    async findFoods(skip = 0, take = 10) {
        return prisma.food.findMany({
            orderBy: {
                name: "asc",
            },
            skip,
            take,
        });
    }

    async countFoods() {
        return prisma.food.count();
    }

    async searchFoods(query) {
        return prisma.food.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            orderBy: {
                name: "asc",
            },
        });
    }

    async updateFood(id, data) {
        return prisma.food.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteFood(id) {
        return prisma.food.delete({
            where: {
                id,
            },
        });
    }
}

export default new FoodRepository();