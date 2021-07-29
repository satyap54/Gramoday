const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

// Controllers
const getAggregatedReport = require('./controllers/getAggregatedReport');
const postReport = require('./controllers/postReport');

// Swagger Ui config
const swaggerUiConfig = require('./swagger-ui/swaggerSetUp.json');

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

app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerUiConfig));

app.get("/ping", (req, res)=>{
  res.status(200).send("pong");
});
app.post("/reports", postReport);
app.get("/reports", getAggregatedReport);

const listener = app.listen(process.env.PORT || 8000, ()=>{
  console.log(`App is listening on port ${listener.address().port}`);
});