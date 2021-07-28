const Report = require('../models/Report');
const moment = require('moment');


/*
  Returns the aggragated report with the specified id

  @param { Object } query
  @param { String } [req.query.reportID] report id of a particular report
*/

const getAggregatedReport = async (req, res)=>{
  const { reportID } = req.query;
  if(!reportID){
    return res.status(400).send("reportID not specified");
  }
  
  try{
    const data = await Report.findById(reportID, '_id cmdtyName cmdtyID marketID marketName users updatedAt pricePerKg').exec();
    if(!data){
      return res.status(404).send("No such report exists");
    }
    
    const { _id, cmdtyName, cmdtyID, marketID, marketName, users, updatedAt, pricePerKg } = data;
    res.status(200).json({
      "_id" : _id,
      "cmdtyName" : cmdtyName,
      "cmdtyID" : cmdtyID, 
      "marketName" : marketName,
      "marketID" : marketID,
      "users" : users,
      "timestamp" : moment(updatedAt).unix(),
      "priceUnit" : "Kg",
      "price" : pricePerKg.toString()
    });
  }catch(e){
    console.error(e);
    res.status(500).send("Try again");
  }
};

module.exports = getAggregatedReport;