require("dotenv").config();
const express = require('express');
const cors = require('cors');
const axios=require('axios');
const multer = require('multer');
const fs = require('fs');
const PdfParse = require("pdf-parse");
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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the upload directory
  },
  filename: function (req, file, cb) {
    const date=new Date();
    cb(null, file.originalname+date.getTime());
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('pdfFiles', 5), async (req, res) => {
  const { files } = req;
  let textContents = '';
  for (const file of files) {
    try {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await PdfParse(dataBuffer);
      textContents+=data.text;
      fs.unlinkSync(file.path)
    } catch (error) {
      console.error('Error extracting text from PDF:',file.path);
    }
  }
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `Please provide a concise summary of the text below, which contains various types of content, including but not limited to informative, descriptive, and argumentative passages. The summary should capture the key points and main ideas presented in the text.Make sure that if there are different type of topics then separate it by "*" symbol.
      The text is ${textContents}`,
      max_tokens: 150,
      temperature: 1,
      n: 1
    },{
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const summary = response.data.choices[0].text.trim();
    res.json({ summary:summary||'couldnot generate the summary' });
  } catch (error) {
    console.error('Error:', error?.response?.data);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
app.post('/textgen', async (req, res) => {
  const {text}=req.body;
  if(!text){
    return res.json({error:'Some keys missing data'});
  }
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt:`Write a creative and relevant sentence about ${text}`,
      max_tokens: 150,
      temperature: 1,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const genText = response.data.choices[0].text.trim();
    return res.json({ genText });
  } catch (error) {
    console.error('Error:', error?.response?.data);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});
app.post('/sentimate',async (req,res)=>{
  const {text}=req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
          prompt: `Analyze the text below and determine the sentiment. Please categorize it into emotions like happy, sad, fearful, surprised, loving, angry, or if the person is feeling thirsty or hungry. Feel free to use other emotional terms as well. The provided text is: '${text}'.`,
          max_tokens: 5,
          temperature: 1,
          n: 1
        },{
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
    
        const sentimate = response.data.choices[0].text.trim();
        res.json({ sentimate });
      } catch (error) {
        console.error('Error:', error?.response?.data);
        res.status(500).json({ error: 'Something went wrong' });
      }
})
app.post('/summerize', async (req, res) => {
  const {article}=req.body;
  if(!article){
    return res.json({error:'Some keys missing data'});
  }
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt:`Summarize the following article:\n${article}\nSummary:`,
      max_tokens: 150,
      temperature: 1,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const summary = response.data.choices[0].text.trim();
    return res.json({ summary });
  } catch (error) {
    console.error('Error:', error?.response?.data);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
