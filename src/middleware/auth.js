import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies?.token || (authHeader && authHeader.startsWith("Bearer") ? authHeader.split(" ")[1] : null);

  if (!token) {
    return res.status(401).json({ success: false, message: "Token topilmadi, tizimga kiring." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token muddati tugagan!" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Yaroqsiz token!" });
    }
    return res.status(500).json({ success: false, message: "Tokenni tasdiqlashda xatolik!" });
  }
};

export default auth;
