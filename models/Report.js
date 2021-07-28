const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reportSchema = new Schema(
  {
    "cmdtyName" : { type : String, required : false },
    "cmdtyId" : { type : String, required : true },
    "marketId" : { type : String, required : true },
    "marketName" : { type : String, required : false },
    "users" : { type : [String], required : true },
    "pricePerKg" : { type : mongoose.Decimal128, required : true }
  },
  { timestamps : true }
)

reportSchema.index({ cmdtyId : 1, marketId : 1 }, { unique : true });

reportSchema.path('users').validate((arr)=>{
  if(arr.length > 2)
    throw new Error("Number of users updating the same commodity cannot be greater than 2");
});

const Report = model("Report", reportSchema);

module.exports = Report;