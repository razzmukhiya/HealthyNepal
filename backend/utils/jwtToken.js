const jwt = require("jsonwebtoken");


const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};


const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};


const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
  
    
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      // secure: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user: user._id,
      name: user.name,
      email: user.email,
      token,
    });
};

module.exports = { sendToken, generateAccessToken, generateRefreshToken };


