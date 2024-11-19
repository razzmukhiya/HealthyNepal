// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
  
    // Options for cookies
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
  
  module.exports = sendToken;

//   const jwt = require('jsonwebtoken');

// // Function to create a JWT token and send it in the response
// const sendToken = (user, statusCode, res) => {
//     // Generate token
//     const token = jwt.sign({ id: user._id }, '2FxXT1NTf2K1Msdsd2o4i6AOvtdI', { expiresIn: '1h' });

//     // Options for cookies
//     const options = {
//         expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
//         httpOnly: true,
//         sameSite: "none",
//         secure: true, // Set to true if using HTTPS
//     };

//     // Send the token in a cookie and also in the response body
//     res.status(statusCode).cookie("token", token, options).json({
//         success: true,
//         user: {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//         },
//         token,
//     });
// };

// module.exports = sendToken;