exports.badRequest = (message, err) => {
  return {
    error: {
      code: 400,
      description: 'Bad request',
      message,
      stack: err
    }
  };
};

exports.internalServerError = (message, err) => {
  return {
    error: {
      code: 500,
      description: 'Internal server error',
      message,
      stack: err
    }
  };
}
