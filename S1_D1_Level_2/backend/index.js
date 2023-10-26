require("dotenv").config();
const express = require('express');
const cors = require('cors');
const axios=require('axios');
// Express App
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.get('/',(req,res)=>{
    return res.json({message:"You are at home"})
});
app.post('/sayari',async (req,res)=>{
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
          prompt: `Generate a sayari`,
          max_tokens: 150,
          temperature: 1,
          n: 1
        },{
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
    
        const shayari = response.data.choices[0].text.trim();
        res.json({ shayari });
      } catch (error) {
        console.error('Error:', error?.response?.data);
        res.status(500).json({ error: 'Something went wrong' });
      }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
