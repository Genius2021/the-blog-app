const postrouter = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");


//create new post
postrouter.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }


})

//update post

postrouter.put("/:id", async (req, res) => {

   try{
     const post = await Post.findById(req.params.id);
     if(post.username === req.body.username){
        try{
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});

            res.status(200).json(updatedPost);
        }catch(err){
            res.status(500).json(err)
         }
    }else{
        res.status(401).json("You can update only your posts!");
    }
         
    }catch(err){
        res.status(500).json(err)
    }
});


postrouter.delete("/:id", async (req, res) => {

    try{
      const post = await Post.findById(req.params.id);
      if(post.username === req.body.username){
         try{
            await post.delete();
             res.status(200).json("Post has been deleted");
         }catch(err){
             res.status(500).json(err)
          }
     }else{
        res.status(401).json("You can delete only your own posts!");
     }
          
     }catch(err){
         res.status(500).json(err)
     }
 });

//get post

postrouter.get("/:id", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json("Post not found");
    }
});

postrouter.get("/", async (req, res) => {
    const username = req.query.username;
    const category = req.query.category;
    try {

        let posts;
       if(username){
           posts = await Post.find({ username})
       }else if(category){
            posts = await Post.find({categories:{
                $in:[category]
            } })
       }else{
           posts = await Post.find();
       }
       res.status(200).json(posts);
    } catch (error) {
        res.status(404).json("Post not found");
    }
})


module.exports = postrouter;