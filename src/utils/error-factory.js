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
