const userrouter = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcryptjs = require("bcryptjs");

userrouter.put("/:id", async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
    if (user){

         if(req.body.password){
            const salt = await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password, salt)
        }
        
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});
            console.log(updatedUser)
            const {_id, firstname, username, profilePic} = updatedUser;
            res.status(200).json({_id, firstname, username, profilePic})

        } catch (error) {
            res.status(500).json(error)

        }

    }else{
        res.status(401).json("Either this User does not exist, or your details are wrong!");
    }
    } catch (error) {
        res.status(401).json(error)
    }
    

       
        

    

        
})


userrouter.delete("/:id", async (req, res) => {

    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
        
       
            try {
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been deleted successfully");

                } catch (error) {
                    res.status(500).json(error)

                }
        }catch(error){
            res.status(404).json("User not found");
        }

    }else{
        res.status(401).json("You can only delete your account!")
    }

        
})

userrouter.get("/:id", async (req, res) => {

        try{
            const user = await User.findById(req.params.id);
            const {_id, firstname, username, profilePic} = user;
            // const {password, ...others} = user._doc;
            res.status(200).json({_id, firstname, username, profilePic});
        
        }catch(error){
            res.status(404).json("User not found");
        }
})


module.exports = userrouter;