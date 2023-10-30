const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const { connection } = require('./config/db');
const { productRouter } = require('./routes/product.route');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/products',productRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT,async () => {
  try{
    await connection
    console.log(`Server is running on port ${PORT}`);
  }catch(err){
    console.log('Error while connecting to DB')
  }
});

module.exports=app
