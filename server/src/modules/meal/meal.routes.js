import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware.js";
import validate, {
    validateParams,
    validateQuery,
} from "../../middlewares/validation.middleware.js";
import {
    createMealSchema,
    dailySummaryQuerySchema,
    getMealsQuerySchema,
    mealIdParamSchema,
    updateMealSchema,
} from "./meal.validation.js";
import {
    createMeal,
    deleteMeal,
    getDailySummary,
    getMealById,
    getMeals,
    updateMeal,
} from "./meal.controller.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    validateQuery(getMealsQuerySchema),
    getMeals
);

router.get(
    "/summary/daily",
    validateQuery(dailySummaryQuerySchema),
    getDailySummary
);

router.post(
    "/",
    validate(createMealSchema),
    createMeal
);

router.get(
    "/:id",
    validateParams(mealIdParamSchema),
    getMealById
);

router.put(
    "/:id",
    validateParams(mealIdParamSchema),
    validate(updateMealSchema),
    updateMeal
);

router.delete(
    "/:id",
    validateParams(mealIdParamSchema),
    deleteMeal
);

export default router;
