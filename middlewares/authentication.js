import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';
const authenticationToken = (req, res, next) => {
  // Lay token tu header
  const token =
    req.headers.authorization?.split(" ")[1] || req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "No token provided.",
    });
  } 
  // Neu ma kiem tra token khong hop le thi tra ve loi
  else {
    try {
      const claims = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.session = claims;
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }
  }
};
export { authenticationToken };