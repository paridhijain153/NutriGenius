import { Router } from "express";

import healthRoutes from "../modules/health/health.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import profileRoutes from "../modules/profile/profile.routes.js";
import mealRoutes from "../modules/meal/meal.routes.js";
import foodRoutes from "../modules/food/food.routes.js";
const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/meals", mealRoutes);
router.use("/foods", foodRoutes);
export default router;