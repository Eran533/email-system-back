const jwt = require("jsonwebtoken");
const winston = require("winston");
const UserModel = require("../models/user");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      ),
    }),
  ],
});

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    logger.error("No token, authorization denied");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    const user = await UserModel.findById(decoded.user.id);
    if (!user) {
      logger.error("User not found in database");
      return res.status(404).json({ msg: "User not found" });
    }
    req.user.email = user.email;
    req.user.firstName = user.firstName;
    req.user.lastName = user.lastName;
    logger.info("User authenticated:", decoded.user);
    next();
  } catch (err) {
    logger.error("Token is not valid:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
