const express = require('express');
const cors=require('cors');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const { connection } = require('./config/db');
const { OpenAiRouter } = require('./routes/openai');
// Express App
const app = express();
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/auth', authRoutes);
// app.use('/protected', protectedRoutes);
app.use('/generate',OpenAiRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,async () => {
  try{
    await connection
    console.log(`Server is running on port ${PORT}`);
  }catch(err){
    console.log('Error while connecting to DB')
  }
});
