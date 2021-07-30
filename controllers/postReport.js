const Report = require('../models/Report');


/*
  Post details of a market commodity combination (can contributed by 2 users).
*/
const postReport = async (req, res)=>{
  let { userID, marketID, marketName, cmdtyID, marketType, cmdtyName, priceUnit, convFctr, price } = 
    req.body.reportDetails;

  // Validate convFctr and price
  if(isNaN(convFctr) || isNaN(price) || convFctr == 0){
    return res.status(400).send("Invalid Conversion Factor or Price");
  }  
  // marketID and cmdtyID are a must
  if(!marketID || !cmdtyID){
    return res.status(400).send("Missing marketID or cmdtyID")
  }

  convFctr = parseFloat(convFctr);
  price = parseFloat(price);
  price /= convFctr;

  try{434545
    let report = await Report.findOne({ "marketID" : marketID , "cmdtyID" : cmdtyID});
    // if there is no report, create one, else take aggregated price
    if(!report){
      report = await Report.create({
        "cmdtyName" : cmdtyName,
        "cmdtyID" : cmdtyID,
        "marketID" : marketID,
        "marketName" : marketName,
        "users" : [userID, ],
        "pricePerKg" : price.toString()
      })
    }else{
      if(report.users.length == 2){
        return res.status(400).send("Only 2 people can update a cmdty-market entity");
      }
      const prevPrice = parseFloat(report.pricePerKg.toString());
      const newPrice = (prevPrice + price)/2.0;
      report.pricePerKg = newPrice;
      report.users.push(userID);
      await report.save();
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
