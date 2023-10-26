const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const { connection } = require('./config/db');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT,async () => {
  try{
    // await connection
    console.log(`Server is running on port ${PORT}`);
  }catch(err){
    console.log('Error while connecting to DB')
  }
});
