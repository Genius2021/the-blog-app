const catrouter = require("express").Router();
const Category = require("../models/Category");



catrouter.post("/", async (req, res) =>{
    const newCategory = new Category(req.body);
    try{
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory)
    }catch(error){
        res.status(500).json(err)
    }
})

catrouter.get("/", async (req, res) =>{
    try{
        const categories = await Category.find();
        res.status(200).json(categories)
    }catch(error){
        res.status(500).json(err)
    }
})



module.exports = catrouter;