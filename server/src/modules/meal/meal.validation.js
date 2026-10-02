import { z } from "zod";
import { AnalysisStatus, MealSource, MealType } from "@prisma/client";

const nutritionNumber = z.coerce.number().min(0).optional();

export const mealIdParamSchema = z.object({
    id: z.string().min(1, "Meal id is required."),
});

export const createMealSchema = z.object({
    mealType: z.nativeEnum(MealType),

    source: z.nativeEnum(MealSource).optional(),

    notes: z
        .string()
        .trim()
        .max(500, "Notes cannot exceed 500 characters.")
        .optional(),

    totalCalories: nutritionNumber,
    totalProtein: nutritionNumber,
    totalCarbs: nutritionNumber,
    totalFat: nutritionNumber,

    loggedAt: z.string().datetime().optional(),
});

export const updateMealSchema = createMealSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    "At least one field is required."
);

export const getMealsQuerySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .min(1, "Page must be at least 1.")
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1, "Limit must be at least 1.")
        .max(100, "Limit cannot exceed 100.")
        .default(10),

    mealType: z.nativeEnum(MealType).optional(),

    analysisStatus: z.nativeEnum(AnalysisStatus).optional(),

    dateFrom: z.string().datetime().optional(),

    dateTo: z.string().datetime().optional(),
});

export const dailySummaryQuerySchema = z.object({
    date: z.string().date().optional(),
});
