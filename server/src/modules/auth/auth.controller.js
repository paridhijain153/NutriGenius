import asyncHandler from "../../utils/async-handler.js";
import authService from "./auth.service.js";
import { successResponse } from "../../common/responses/api-response.js";
export const register = asyncHandler(async (req, res) => {

    const user = await authService.register(req.validatedData);

    return successResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: user
    });

});
export const login = asyncHandler(async (req, res) => {

    const result = await authService.login(req.validatedData);

    return successResponse(res, {
        message: "Login successful",
        data: result,
    });

});
export const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await authService.getCurrentUser(req.user.id);

    return successResponse(res, {
        message: "User fetched successfully.",
        data: user,
    });

});
export const refresh = asyncHandler(async (req, res) => {

    const { refreshToken } = req.body;

    const token =
        await authService.refreshAccessToken(refreshToken);

    return successResponse(res, {
        message: "Access token refreshed",
        data: token,
    });

});
export const logout = asyncHandler(async (req, res) => {

    const { refreshToken } = req.body;

    await authService.logout(refreshToken);

    return successResponse(res, {
        message: "Logged out successfully.",
    });

});
export const logoutAll = asyncHandler(async (req, res) => {

    await authService.logoutAll(req.user.id);

    return successResponse(res, {
        message: "Logged out from all devices.",
    });

});