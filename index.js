const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose');


try{
  mongoose.connect(
    process.env["MONGO_URI"],
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    }
  )
}catch(error){
  console.error(error);
}


app.use(bodyParser.json());
app.use(cors());
