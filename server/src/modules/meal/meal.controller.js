import asyncHandler from "../../utils/async-handler.js";
import mealService from "./meal.service.js";
import { successResponse } from "../../common/responses/api-response.js";
import { MEAL_MESSAGES } from "./meal.constants.js";

export const createMeal = asyncHandler(async (req, res) => {
    const meal = await mealService.createMeal(
        req.user.id,
        req.validatedData
    );

    return successResponse(res, {
        statusCode: 201,
        message: MEAL_MESSAGES.CREATED,
        data: meal,
    });
});

export const getMeals = asyncHandler(async (req, res) => {
    const result = await mealService.getMeals(
        req.user.id,
        req.validatedQuery
    );

    return successResponse(res, {
        message: "Meals fetched successfully.",
        data: result.items,
        meta: result.meta,
    });
});

export const getMealById = asyncHandler(async (req, res) => {
    const meal = await mealService.getMealById(
        req.user.id,
        req.validatedParams.id
    );

    return successResponse(res, {
        message: "Meal fetched successfully.",
        data: meal,
    });
});

export const updateMeal = asyncHandler(async (req, res) => {
    const meal = await mealService.updateMeal(
        req.user.id,
        req.validatedParams.id,
        req.validatedData
    );

    return successResponse(res, {
        message: "Meal updated successfully.",
        data: meal,
    });
});

export const deleteMeal = asyncHandler(async (req, res) => {
    await mealService.deleteMeal(
        req.user.id,
        req.validatedParams.id
    );

    return successResponse(res, {
        message: "Meal deleted successfully.",
    });
});

export const getDailySummary = asyncHandler(async (req, res) => {
    const summary = await mealService.getDailySummary(
        req.user.id,
        req.validatedQuery.date
    );

    return successResponse(res, {
        message: "Daily meal summary fetched successfully.",
        data: summary,
    });
});
