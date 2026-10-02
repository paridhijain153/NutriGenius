import AppError from "../../common/errors/app-error.js";
import profileRepository from "./profile.repository.js";
import {
    calculateAge,
    calculateBMI,
    calculateBMR,
    calculateCalories,
    calculateMacros,
    calculateTDEE,
} from "./profile.utils.js";

const toProfileResponse = (profile) => {
    const insights = {
        bmi: null,
        age: null,
        bmr: null,
        tdee: null,
        dailyCalories: null,
        macros: null,
    };

    if (profile.currentWeight && profile.height) {
        insights.bmi = calculateBMI(profile.currentWeight, profile.height);
    }

    if (profile.dateOfBirth) {
        insights.age = calculateAge(profile.dateOfBirth);
    }

    const canCalculateTargets =
        profile.gender &&
        profile.gender !== "OTHER" &&
        profile.currentWeight &&
        profile.height &&
        insights.age !== null &&
        profile.activityLevel &&
        profile.goal;

    if (canCalculateTargets) {
        insights.bmr = Math.round(
            calculateBMR(
                profile.gender,
                profile.currentWeight,
                profile.height,
                insights.age
            )
        );
        insights.tdee = calculateTDEE(insights.bmr, profile.activityLevel);
        insights.dailyCalories = calculateCalories(insights.tdee, profile.goal);
        insights.macros = calculateMacros(insights.dailyCalories);
    }

    return {
        ...profile,
        insights,
    };
};

class ProfileService {
    async createProfile(userId, profileData) {
        const existingProfile = await profileRepository.findByUserId(userId);

        if (existingProfile) {
            throw new AppError("Profile already exists.", 409);
        }

        if (profileData.dateOfBirth) {
            profileData.dateOfBirth = new Date(profileData.dateOfBirth);
        }

        const profile = await profileRepository.create({
            ...profileData,
            userId,
        });

        return toProfileResponse(profile);
    }

    async updateProfile(userId, profileData) {
        const profile = await profileRepository.findByUserId(userId);

        if (!profile) {
            throw new AppError("Profile not found.", 404);
        }

        if (profileData.dateOfBirth) {
            profileData.dateOfBirth = new Date(profileData.dateOfBirth);
        }

        const updatedProfile = await profileRepository.update(userId, profileData);

        return toProfileResponse(updatedProfile);
    }

    async getProfile(userId) {
        const profile = await profileRepository.findByUserId(userId);

        if (!profile) {
            throw new AppError("Profile not found.", 404);
        }

        return toProfileResponse(profile);
    }
}

export default new ProfileService();
