require('dotenv').config()
const mongoose=require('mongoose');

const connection=mongoose.connect(`mongodb+srv://abak00350:${process.env.PASSWORD}@cluster0.gqkghm4.mongodb.net/openai_user?retryWrites=true&w=majority`);
module.exports={
    connection
}