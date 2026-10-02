import { verifyAccessToken } from "../utils/jwt.js";
import prisma from "../database/prisma.js";
import authRepository from "../modules/auth/auth.repository.js";
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token is missing.",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: "Your account has been blocked.",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export default authenticate;
