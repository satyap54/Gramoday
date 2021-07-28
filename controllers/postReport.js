const Report = require('../models/Report');


const postReport = async (req, res)=>{
  let { userID, marketID, marketName, cmdtyID, marketType, cmdtyName, priceUnit, convFctr, price } = 
    req.body.reportDetails;

  // Validate convFctr and price
  if(isNaN(convFctr) || isNaN(price)){
    return res.status(400).send("Invalid Conversion Factor or Price");
  }  
  convFctr = parseFloat(convFctr);
  // TODO convert price to pricePerKg
  price = parseFloat(price);
  price /= convFctr;

  try{
    let report = await Report.findOne({ "marketID" : marketID , "cmdtyID" : cmdtyID});
    // if there is no report, create one
    if(!report){
      report = await Report.create({
        "cmdtyName" : cmdtyName,
        "cmdtyID" : cmdtyID,
        "marketID" : marketID,
        "marketName" : marketName,
        "users" : [userID, ],
        "pricePerKg" : price
      })
    }else{
      if(report.users.length == 2){
        return res.status(400).send("Only 2 people can update a cmdty-market entity");
      }
      const newPrice = (report.price + price)/2.0;
      report.price = newPrice;
      report.users.push(userID);
      report.save();
    }
    res.status(200).json({
      "status" : "success",
      "reportID" : report._id
    })
  }catch(e){
    console.error(e);
    res.status(500).send("Try again");
  }
}

module.exports = postReport;