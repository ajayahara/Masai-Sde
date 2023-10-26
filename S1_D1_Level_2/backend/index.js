require("dotenv").config();
const express = require('express');
const cors = require('cors');
const axios=require('axios');
const multer = require('multer');
const pdf = require('pdf-parse');
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
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('pdfFiles', 2), async (req, res) => {
  const { files } = req;
  const textContents = [];

  for (const file of files) {
    try {
      const dataBuffer = file.buffer; // Get the file buffer
      const uint8Array = new Uint8Array(dataBuffer);
      const data = await pdf(uint8Array);
      // Make sure to convert the data to a string
      textContents.push(data.text);
    } catch (error) {
      console.error('Error extracting text from a PDF:', error);
      textContents.push('Error extracting text');
    }

  }

  res.json({ textContents });
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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
