export const successResponse = (
  res,
  {
    statusCode = 200,
    message = "Success",
    data = null,
    meta,
  } = {}
) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

export const errorResponse = (
    res,
    {
        statusCode = 500,
        message = "Something went wrong",
        errors = null
    } = {}
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
};