const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token"
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Attach user id to request
    req.userId = decoded.id;

    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Unauthorized: Invalid token"
    });
  }
};

