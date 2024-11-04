// const express = require("express");
// const path = require("path");
// const { upload } = require("../multer");
// const router = express.Router();
// const ErrorHandler = require("../utils/ErrorHandler")
// const catchAsyncErrors = require("../middleware/catchAsyncError");
// const fs = require("fs");
// const jwt = require("jsonwebtoken");
// const sendMail = require("../utils/sendMail");
// const sendToken = require("../utils/jwtToken");
// const User = require('../model/user');
// // const { url } = require("inspector");



// // activate user
// router.post("/create-user", upload.single("file"), async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const userEmail = await User.findOne({ email });

//     if (userEmail) {
//       return next(new ErrorHandler("User already exists", 400));
//     }

//     // if (userEmail) {
//     //   const filename = req.file.filename;
//     //   const filepath = `uploads/${filename}`;
//     //   fs.unlink(filepath, (err) => {
//     //     if (err) {
//     //       console.log(err);
//     //       res.status(500).json({ message: "Error deleting file" });
//     //     } else {
//     //       res.json({ message: "File deleted successfully" });
//     //     }
//     //   })
//     //   return next(new ErrorHandler("User already exists", 400));
//     // }

//     // const filename = req.file.filename;
//     // const fileurl = path.join(__dirname, filename);


  
  
//     const user = {
//       name: name,
//       email: email,
//       password: password,
//       // avatar: {
//       //   fileurl: 'default_avatar_url',
//       //   public_id: 'default_public_id'
//       // },
//     };
//     console.log(user);

  
  





//     const newUser = await User.create(user);
//     res.status(201).json({
//       success: true,
//       newUser,
//     });

//     const activationToken = createActivationToken(user);
//     const activationUrl = `http://localhost:5173/activation/${activationToken}`;

//     try {
//       await sendMail({
//         email: user.email,
//         subject: "Activate your account",
//         message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
//       });
//       res.status(201).json({
//         success: true,
//         message: `please check your email:- ${user.email} to activate your account!`,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });
  
  

// // create activation token
// const createActivationToken = (user) => {
//   return jwt.sign(user, process.env.ACTIVATION_SECRET, {
//     expiresIn: "5m",
//   });
// };

// // activate user
// router.post(
//   "/activation",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;

//       const newUser = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );

//       if (!newUser) {
//         return next(new ErrorHandler("Invalid token", 400));
//       }
//       const { name, email, password } = newUser;

//       let user = await User.findOne({ email });

//       if (user) {
//         return next(new ErrorHandler("User already exists", 400));
//       }
//       user = await User.create({
//         name,
//         email,
//         password,
//       });

//       sendToken(user, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// // login user
// router.post("/login-user", catchAsyncErrors(async(req,res,next) => {
//   try{
//     const {email,password} = req.body;
    
//     if(!email || !password){
//       return next(new ErrorHandler("Please provide both email and password",400));
//     }

//     const user = await User.findOne({email}).select("+password");

//     if(!user){
//       return next(new ErrorHandler("User doesn't exists!",400));
//     }

//     const isPasswordValid = await user.comparePassword(password);

//     if(!isPasswordValid){
//       return next(new ErrorHandler("Invalid password",400));
//     }

//     sendToken(user, 201, res);

//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// }))

// module.exports = router;

const express = require("express");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require('../model/user');
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User  already exists", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    
    const newUser  = await User.create(user);
    
    // Respond with success message and user information
    res.status(201).json({
      success: true,
      user: {
        id: newUser ._id,
        name: newUser .name,
        email: newUser .email,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Login user
router.post("/login-user", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide both email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User  doesn't exist!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid password", 400));
    }

    // Respond with success message and user information
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

//load user
router.get("/getuser", isAuthenticated, catchAsyncErrors(async(req,res,next) => {
  try {
    const user = await User.findById(req.user.id);

    if(!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;
