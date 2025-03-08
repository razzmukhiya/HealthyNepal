
const sendShopToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
  
    
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
    //   secure: true,
    };
  
    
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      address: user.address,
      phoneNumber: user.phoneNumber,
      zipCode: user.zipCode
    };

    res.status(statusCode).cookie("seller_token", token, options).json({
      success: true,
      user: userData,
      token: token
    });
  };
  
  module.exports = sendShopToken;