const authrouter = require("express").Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");


authrouter.post("/register", async (req, res) => {
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(req.body.password, salt);
        const newUser = new User({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            username: req.body.username,
            email: req.body.email,
            profilePic: req.body.profilePic,
            password: hashedPass

        });
        await newUser.save();
        const { _id, firstname, username, profilePic } = newUser;
        res.status(200).json({_id, firstname, username, profilePic});

    } catch (error) {
        res.status(500).json(error)

    }
})


authrouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("You entered an incorrect username!");

        const validated = await bcryptjs.compareSync(req.body.password, user.password);
        !validated && res.status(400).json("The password you entered is incorrect")
        const {_id, firstname, username, profilePic } = user;
        res.status(200).json({_id, firstname, username, profilePic});

    } catch (error) {
        res.status(500).json(error)

    }
})


module.exports = authrouter;