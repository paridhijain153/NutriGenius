import { Router } from "express";

import { register } from "./auth.controller.js";

import validate from "../../middlewares/validation.middleware.js";
import authenticate from "../../middlewares/auth.middleware.js";
import { registerSchema } from "./auth.validation.js";
import {login} from  "./auth.controller.js";
import { getCurrentUser } from "./auth.controller.js";
import { loginSchema } from "./auth.validation.js";
import {refresh} from "./auth.controller.js";
import {logout} from "./auth.controller.js";
import {logoutAll} from "./auth.controller.js";
const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);
router.post(
    "/login",
    validate(loginSchema),
    login
);
router.get(
    "/me",
    authenticate,
    getCurrentUser
);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post(
    "/logout-all",
    authenticate,
    logoutAll
);
export default router;