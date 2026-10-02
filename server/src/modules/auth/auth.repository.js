import prisma from "../../database/prisma.js";

class AuthRepository {

    async findUserByEmail(email) {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(userData) {
        return prisma.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });
    }

    async findUserForLogin(email) {
    return prisma.user.findUnique({
        where: { email }
    });
}
async createRefreshToken(tokenData) {
    return prisma.refreshToken.create({
        data: tokenData,
    });
}

async deleteRefreshToken(token) {
    return prisma.refreshToken.deleteMany({
        where: {
            token,
        },
    });
}
async findUserById(id) {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isVerified: true,
            createdAt: true,
        },
    });
}
async findRefreshToken(token) {
    return prisma.refreshToken.findUnique({
        where: {
            token,
        },
        include: {
            user: true,
        },
    });
}

async revokeRefreshToken(token) {
    return prisma.refreshToken.update({
        where: {
            token,
            isRevoked: false,
        },
        data: {
            isRevoked: true,
        },
    });
}

async revokeAllRefreshTokens(userId) {
    return prisma.refreshToken.updateMany({
        where: {
            userId,
            isRevoked: false,
        },
        data: {
            isRevoked: true,
        },
    });
}
}

export default new AuthRepository();