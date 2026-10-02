import { z } from "zod";

export const profileSchema = z.object({

    phone: z.string().min(10).max(15).optional(),

    gender: z.enum([
        "MALE",
        "FEMALE",
        "OTHER"
    ]).optional(),

    dateOfBirth: z.string().date().optional(),

    height: z.number().min(50).max(250),

    currentWeight: z.number().min(20).max(300),

    targetWeight: z.number().min(20).max(300),

    activityLevel: z.enum([
        "SEDENTARY",
        "LIGHT",
        "MODERATE",
        "ACTIVE",
        "ATHLETE"
    ]),

    goal: z.enum([
        "FAT_LOSS",
        "MUSCLE_GAIN",
        "MAINTENANCE"
    ]),

    dietaryPreference: z.enum([
        "VEGETARIAN",
        "VEGAN",
        "EGGETARIAN",
        "NON_VEGETARIAN",
        "PESCATARIAN"
    ]),

    dietaryRestrictions: z.array(z.string()).default([]),

    allergies: z.array(z.string()).default([]),

    healthConditions: z.array(z.string()).default([]),

    dislikedFoods: z.array(z.string()).default([]),

    cuisinePreference: z.string().optional(),

    budgetPreference: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH"
    ]).optional(),

    sleepHours: z.number().optional(),

    waterGoal: z.number().optional()

});