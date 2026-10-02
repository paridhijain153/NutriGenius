const getValidationErrors = (error) => error.issues || error.errors || [];

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            req.validatedData = await schema.parseAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: getValidationErrors(error),
            });
        }
    };
};

export const validateQuery = (schema) => {
    return async (req, res, next) => {
        try {
            req.validatedQuery = await schema.parseAsync(req.query);
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: getValidationErrors(error),
            });
        }
    };
};

export const validateParams = (schema) => {
    return async (req, res, next) => {
        try {
            req.validatedParams = await schema.parseAsync(req.params);
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: getValidationErrors(error),
            });
        }
    };
};

export default validate;
