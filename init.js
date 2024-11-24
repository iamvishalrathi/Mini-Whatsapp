const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

//Connection
main()
.then(()=>{
    console.log("Connection Successful")
})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Chats
let allChats= [{ //Arr of Chats
    from: "Vishal",
    to: "Shivam",
    msg: "Hello",
    created_at: new Date() // UTC
},
{
    from: "Rahul",
    to: "Shivam",
    msg: "Hello",
    created_at: new Date() // UTC
},
{
    from: "Mohan",
    to: "Shivam",
    msg: "Hello",
    created_at: new Date() // UTC
},
{
    from: "Amit",
    to: "Shivam",
    msg: "Hello",
    created_at: new Date() // UTC
}]; 

Chat.insertMany(allChats);