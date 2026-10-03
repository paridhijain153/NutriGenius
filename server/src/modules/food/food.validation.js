import { z } from "zod";

const nonNegativeNumber = z.coerce.number().min(0);

export const foodIdParamSchema = z.object({
    id: z.string().min(1, "Food id is required."),
});

export const createFoodSchema = z.object({
    name: z.string().trim().min(1, "Food name is required."),
    brand: z.string().trim().optional(),
    category: z.string().trim().optional(),

    servingSize: nonNegativeNumber.optional(),
    servingUnit: z.string().trim().optional(),

    calories: nonNegativeNumber,
    protein: nonNegativeNumber,
    carbs: nonNegativeNumber,
    fat: nonNegativeNumber,

    fiber: nonNegativeNumber.optional(),
    sugar: nonNegativeNumber.optional(),
    sodium: nonNegativeNumber.optional(),

    imageUrl: z.string().url().optional(),

    isVerified: z.boolean().optional(),
    isVegetarian: z.boolean().optional(),
    isVegan: z.boolean().optional(),
    isJainFriendly: z.boolean().optional(),

    glycemicIndex: nonNegativeNumber.optional(),
    foodGroup: z.string().trim().optional(),
});

export const updateFoodSchema = createFoodSchema.partial();

export const getFoodsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const searchFoodsQuerySchema = z.object({
    q: z.string().trim().min(1, "Search query is required."),
});