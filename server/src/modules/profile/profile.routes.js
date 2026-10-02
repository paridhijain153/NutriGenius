import { Router } from "express";

import authenticate from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validation.middleware.js";

import {
    createProfile,
    getProfile,
    updateProfile
} from "./profile.controller.js";

import {
    profileSchema
} from "./profile.validation.js";

const router = Router();

router.use(authenticate);

router.get("/me", getProfile);

router.post(
    "/",
    validate(profileSchema),
    createProfile
);

router.put(
    "/",
    validate(profileSchema),
    updateProfile
);

export default router;