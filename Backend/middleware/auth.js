const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    // console.log(header);

    if (!header) {
      return res.status(401).json({ message: "No token" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;  

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = auth;