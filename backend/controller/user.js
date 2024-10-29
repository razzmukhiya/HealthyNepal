const express = require("express");
const path = require("path");
const {upload} = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler")
const fs = require("fs");


router.post("/create-user", upload.single("file"), async (req, res) => {
    const {name,email,passwprd} = req.body;
        const userEmail = await UserInfo.findOne({email});
        
        if(userEmail){
            const filename = req.file.filename;
            const filepath = `uploads/${filename}`;
            fs.unlink(filepath, (err) => {
                if(err){
                    console.log(err);
                    res.status(500).json({message: "Error deleting file"});
                } else {
                    res.json({message: "File deleted successfully"});
                }
            })
            return nextTick(new ErrorHandler("User already exists", 400));
        }

        const filename = req.file.filename;
        const fileurl = path.json(filename);

        const user = {
            name: name,
            email: email,
            passward: password,
            avatar: fileurl,
        };

        console.log(user);

        const newUser = await user.create(user);
        res.status(201).json({
            success: true,
            newUser,
        });

});

module.exports = router;