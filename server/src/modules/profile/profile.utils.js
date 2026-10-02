export const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;

    return Number(
        (
            weight /
            (heightInMeters * heightInMeters)
        ).toFixed(2)
    );
};
export const calculateAge = (dob) => {

    const birthDate = new Date(dob);

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
        today.getMonth() - birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }

    return age;
};

export const calculateBMR = (
    gender,
    weight,
    height,
    age
) => {

    if (gender === "MALE") {
        return (
            10 * weight +
            6.25 * height -
            5 * age +
            5
        );
    }

    return (
        10 * weight +
        6.25 * height -
        5 * age -
        161
    );

};

export const calculateTDEE = (
    bmr,
    activityLevel
) => {

    const activityMultiplier = {
        SEDENTARY: 1.2,
        LIGHT: 1.375,
        MODERATE: 1.55,
        ACTIVE: 1.725,
        ATHLETE: 1.9
    };

    return Math.round(
        bmr * activityMultiplier[activityLevel]
    );
};

export const calculateCalories = (
    tdee,
    goal
) => {

    switch (goal) {

        case "FAT_LOSS":
            return tdee - 500;

        case "MUSCLE_GAIN":
            return tdee + 300;

        default:
            return tdee;

    }

};

export const calculateMacros = (
    calories
) => {

    const protein =
        Math.round((calories * 0.30) / 4);

    const carbs =
        Math.round((calories * 0.40) / 4);

    const fat =
        Math.round((calories * 0.30) / 9);

    return {

        protein,

        carbs,

        fat

    };

};