import { Router } from "express";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";
import validate, {
    validateParams,
    validateQuery,
} from "../../middlewares/validation.middleware.js";

import {
    createFood,
    getFoods,
    getFoodById,
    searchFoods,
    updateFood,
    deleteFood,
} from "./food.controller.js";

import {
    createFoodSchema,
    updateFoodSchema,
    foodIdParamSchema,
    getFoodsQuerySchema,
    searchFoodsQuerySchema,
} from "./food.validation.js";

const router = Router();

router.use(authenticate);

// Read operations
router.get(
    "/",
    validateQuery(getFoodsQuerySchema),
    getFoods
);

router.get(
    "/search",
    validateQuery(searchFoodsQuerySchema),
    searchFoods
);

router.get(
    "/:id",
    validateParams(foodIdParamSchema),
    getFoodById
);

// Admin-only write operations
router.post(
    "/",
    authorize("ADMIN"),
    validate(createFoodSchema),
    createFood
);

router.put(
    "/:id",
    authorize("ADMIN"),
    validateParams(foodIdParamSchema),
    validate(updateFoodSchema),
    updateFood
);

router.delete(
    "/:id",
    authorize("ADMIN"),
    validateParams(foodIdParamSchema),
    deleteFood
);

export default router;