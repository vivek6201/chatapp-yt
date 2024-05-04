import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized! - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized! - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password"); // ye vhi userId h jo generateToken ka sign method me pass kiye h.
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    req.user = user; // mere req field me jo user rhega usko DB wale user se compare kr rhe h, if ok then next()
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", { error: error.message });
    res.status(500).json({ error: error.message });
  }
};
export default protectRoute;
