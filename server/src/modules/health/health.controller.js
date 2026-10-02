import { successResponse } from "../../common/responses/api-response.js";

export const healthCheck = (req, res) => {
    return successResponse(res, {
        message: "NutriGenius API is running 🚀",
        data: {
            status: "healthy",
            timestamp: new Date().toISOString()
        }
    });
};