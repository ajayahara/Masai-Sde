require('dotenv').config();
const express=require('express');
const {chat}=require('./weather');
const cors=require('cors')

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||3000;

app.get('/',(req,res)=>{
  res.status(200).json({message:'You are at home page'})
});

app.post('/weather',async (req,res)=>{
  const {message}=req.body;
  try {
    const response=await chat.sendMessage(message);
    res.status(200).json({message:response.content});
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"I apologize, but I'm unable to assist with your request at this time. If you have any other questions or need help with a different topic, please feel free to ask, and I'll do my best to provide the information or assistance you need"});
  }
});
app.listen(PORT,()=>{
  console.log(`Server is running at port ${PORT}`)
})