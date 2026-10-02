export const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        message: "NutriGenius API is running 🚀",
        timestamp: new Date().toISOString()
    });
};