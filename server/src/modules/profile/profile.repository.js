import prisma from "../../database/prisma.js";

class ProfileRepository {

    async findByUserId(userId) {

        return prisma.profile.findUnique({
            where: {
                userId
            }
        });

    }

    async create(data) {

        return prisma.profile.create({
            data
        });

    }

    async update(userId, data) {

        return prisma.profile.update({
            where: {
                userId
            },
            data
        });

    }

}

export default new ProfileRepository();