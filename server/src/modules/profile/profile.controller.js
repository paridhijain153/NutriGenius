import asyncHandler from "../../utils/async-handler.js";
import profileService from "./profile.service.js";
import { successResponse } from "../../common/responses/api-response.js";

export const createProfile = asyncHandler(async (req, res) => {

    const profile = await profileService.createProfile(
        req.user.id,
        req.validatedData
    );

    return successResponse(res, {
        statusCode: 201,
        message: "Profile created successfully.",
        data: profile
    });

});

export const getProfile = asyncHandler(async (req, res) => {

    const profile = await profileService.getProfile(
        req.user.id
    );

    return successResponse(res, {
        message: "Profile fetched successfully.",
        data: profile
    });

});

export const updateProfile = asyncHandler(async (req, res) => {

    const profile =
        await profileService.updateProfile(
            req.user.id,
            req.validatedData
        );

    return successResponse(res, {
        message: "Profile updated successfully.",
        data: profile
    });

});