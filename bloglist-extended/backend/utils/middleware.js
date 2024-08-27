const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({
      error: "token invalid",
    });
  }

  request.user = await User.findById(decodedToken.id);

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response.status(400).json({
      error: "expected `username` to be unique",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "token invalid",
    });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unknown endpoint",
  });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
