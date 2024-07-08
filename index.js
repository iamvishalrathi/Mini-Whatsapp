const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride= require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))

//Connection
main()
.then(()=>{
    console.log("Connection Successful")
})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Chat
// let chat1 = new Chat({
//     from: "Vishal",
//     to: "Shivam",
//     msg: "Chala Jaa BSDK",
//     created_at: new Date() // UTC
// });

// chat1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

//Index Route
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
});

//New Route
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
});

//Create Route
app.post("/chats", (req,res)=>{
    let {from , msg , to} = req.body;
    let newChat = new Chat({
        from : from,
        to: to,
        msg: msg,
        created_at: new Date(),
        updated_at: new Date()
    });

    newChat.save() // It is asynchronous method but no need for await as it is thennable
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });

    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//Update Route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg: newMsg}= req.body;
    let date = new Date();
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg, updated_at: date}, 
        {runValidators:true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

//Home Route
app.get("/", (req,res)=>{
    console.log("Working");
});

//Listen
app.listen("8080", ()=>{
    console.log("Listening");
});