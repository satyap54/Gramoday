const Report = require('../models/Report');


const postReport = async (req, res)=>{
  const { _id, userID, marketID, marketName, cmdtyID, marketType, cmdtyName, priceUnit, convFctr, price } = 
    req.body.reportDetails;

  // Validate convFctr and price
  if(isNaN(convFctr) || isNaN(price)){
    return res.status(400).send("Invalid Conversion Factor or Price");
  }
   
  try{
    let report = await Report.findOne({ "marketID" : marketID , "cmdtyID" : cmdtyID});
    // if there is no report, create one
    if(!report){

    }else{
      
    }
  }catch(e){
    console.log(e);
    res.status(500).send("Try again");
  }
}

module.exports = postReport;