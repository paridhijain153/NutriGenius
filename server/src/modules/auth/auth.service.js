import crypto from "node:crypto";
import { hashPassword, comparePassword } from "../../utils/password.js";
import AppError from "../../common/errors/app-error.js";
import authRepository from "./auth.repository.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../../utils/jwt.js";

const hashRefreshToken = (token) =>
    crypto.createHash("sha256").update(token).digest("hex");

class AuthService {
    async register(userData) {
        const existingUser = await authRepository.findUserByEmail(userData.email);

        if (existingUser) {
            throw new AppError("Email already registered", 409);
        }

        const hashedPassword = await hashPassword(userData.password);

        const user = await authRepository.createUser({
            ...userData,
            password: hashedPassword,
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }

    async login(loginData) {
        const { email, password } = loginData;

        const user = await authRepository.findUserForLogin(email);

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401);
        }

        if (user.isBlocked) {
            throw new AppError("Your account has been blocked.", 403);
        }

        const payload = {
            id: user.id,
            role: user.role,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        await authRepository.createRefreshToken({
            token: hashRefreshToken(refreshToken),
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    async getCurrentUser(userId) {
        const user = await authRepository.findUserById(userId);

        if (!user) {
            throw new AppError("User not found.", 404);
        }

        return user;
    }

    async refreshAccessToken(refreshToken) {
        verifyRefreshToken(refreshToken);

        const storedToken = await authRepository.findRefreshToken(
            hashRefreshToken(refreshToken)
        );

        if (!storedToken) {
            throw new AppError("Invalid refresh token", 401);
        }

        if (storedToken.isRevoked) {
            throw new AppError("Refresh token revoked", 401);
        }

        if (storedToken.expiresAt < new Date()) {
            throw new AppError("Refresh token expired", 401);
        }

        const accessToken = generateAccessToken({
            id: storedToken.user.id,
            role: storedToken.user.role,
        });

        return { accessToken };
    }

    async logout(refreshToken) {
        const tokenHash = hashRefreshToken(refreshToken);
        const token = await authRepository.findRefreshToken(tokenHash);

        if (!token) {
            throw new AppError("Invalid refresh token", 401);
        }

        await authRepository.revokeRefreshToken(tokenHash);
    }

    async logoutAll(userId) {
        await authRepository.revokeAllRefreshTokens(userId);
    }
}

export default new AuthService();
