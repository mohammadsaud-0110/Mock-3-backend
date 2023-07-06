const express = require("express");
const bookRouter = express.Router();
const BookModel = require("../models/book.model");

bookRouter.get("/getBooks", async (req,res)=>{
    try {

        if(req.query.sortBy && req.query.filter){
            const {Order,filter} = req.query;
            if(Order == "asc"){
                const data = await BookModel.aggregate([{ $match: {genre : filter}}, { $sort: {price:1}}]);
                res.send({"error" : false, "message" : data})
            }
            else if(Order == "desc"){
                const data = await BookModel.aggregate([{ $match: {genre : filter}}, { $sort: {price:-1}}]);
                res.send({"error" : false, "message" : data})
            }
        }

        else if(!req.query.sortBy && req.query.filter){
            const option = req.query.filter;
            const books = await BookModel.find({genre : option});
            res.send({"error" : false, "message" : books});
        }

        else if(req.query.sortBy && !req.query.filter){
            const order = req.query.Order;
            if(order == "asc"){
                const books = await BookModel.aggregate( [ { $sort: { price : 1 } } ] );
                res.send({"error" : false, "message" : books});
            }
            else if(order == "desc"){
                const books = await BookModel.aggregate( [ { $sort: { price : -1 } } ] );
                res.send({"error" : false, "message" : books});
            }
        }
        
        else{
            const allBooks = await BookModel.find();
            res.send(allBooks);
        }
    }
    catch (error) {
        res.send({"error" : true, "message" : error.message});
    }
})

bookRouter.post("/addBook", async(req,res)=>{
    try {
        const {title, author, genre, description, price} = req.body;
        const isBookPresent = await BookModel.findOne({title});
        if(isBookPresent){
            res.send({"error" : false, "message" : "Book Already Present"});
        }
        else{
            const book = new BookModel({title, author, genre, description, price});
            await book.save();
            res.send({"error" : false, "message" : "New Book Added Successfully!"});
        }
    }
    catch (error) {
        res.send({"error" : true, "message" : error.message});
    }
})

bookRouter.delete("/deleteBook/:bookID", async (req,res)=>{
    try {
        const id = req.params.bookID;
        await BookModel.findByIdAndDelete(id);
        res.send({"error" : false, "message" : "Book Deleted!"});
    }
    catch (error) {
        res.send({"error" : true, "message" : "Could not Delete Book"+error.message});
    }
})


module.exports = bookRouter;

// title: String,
//     author: String,
//     genre: String,
//     description: String,
//     price: Number