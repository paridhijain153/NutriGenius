import asyncHandler from "../../utils/async-handler.js";
import foodService from "./food.service.js";
import { successResponse } from "../../common/responses/api-response.js";
import { FOOD_MESSAGES } from "./food.constants.js";

export const createFood = asyncHandler(async (req, res) => {
    const food = await foodService.createFood(req.validatedData);

    return successResponse(res, {
        statusCode: 201,
        message: FOOD_MESSAGES.CREATED,
        data: food,
    });
});

export const getFoods = asyncHandler(async (req, res) => {
    const result = await foodService.getFoods(req.validatedQuery);

    return successResponse(res, {
        message: FOOD_MESSAGES.FETCHED_ALL,
        data: result.items,
        meta: result.meta,
    });
});

export const getFoodById = asyncHandler(async (req, res) => {
    const food = await foodService.getFoodById(
        req.validatedParams.id
    );

    return successResponse(res, {
        message: FOOD_MESSAGES.FETCHED,
        data: food,
    });
});

export const searchFoods = asyncHandler(async (req, res) => {
    const foods = await foodService.searchFoods(
        req.validatedQuery.q
    );

    return successResponse(res, {
        message: FOOD_MESSAGES.FETCHED_ALL,
        data: foods,
    });
});

export const updateFood = asyncHandler(async (req, res) => {
    const food = await foodService.updateFood(
        req.validatedParams.id,
        req.validatedData
    );

    return successResponse(res, {
        message: FOOD_MESSAGES.UPDATED,
        data: food,
    });
});

export const deleteFood = asyncHandler(async (req, res) => {
    await foodService.deleteFood(
        req.validatedParams.id
    );

    return successResponse(res, {
        message: FOOD_MESSAGES.DELETED,
    });
});