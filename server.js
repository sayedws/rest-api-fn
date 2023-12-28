const express = require("express");
const app = express();
require("dotenv").config({ path: "./Config/.env" });
const connect = require("./Config/connectDB");
const user = require("./model/user");
connect();
app.use(express.json())
app.post("/add", async (req, res) => {
  const { fullName, email, phone } = req.body;
  console.log(req.body)
  try {
    const newUser = user({
      fullName,
      email,
      phone,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.get('/get',async(req,res)=>{
    try {
        const users = await user.find();
    res.send(users);
    } catch (error) {
        console.log(error.message)
        
    }
    
});
app.get('/get/:id',async(req,res)=>{
    try {
        const users = await user.findById(req.params.id);
    res.send(users);
    } catch (error) {
        console.log(error.message)
        
    }
    
});

app.put('/update/:id', async (req,res) => {
    try {
        const editedUser = await user.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
        res.send(editedUser)
    } catch (error) {
        console.log(error.message)
    }
});





const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("Server is running on PORT ${PORT}")
);
