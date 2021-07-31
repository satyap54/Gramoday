const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reportSchema = new Schema(
  {
    "cmdtyName" : { type : String, required : true },
    "cmdtyID" : { type : String, required : true },
    "marketID" : { type : String, required : true },
    "marketName" : { type : String, required : true },
    "users" : { type : [String], required : true },
    "totalPrice" : { type : mongoose.Decimal128, required : true }
  },
  { timestamps : true }
)

reportSchema.index({ cmdtyId : 1, marketId : 1 }, { unique : true });
const Report = model("Report", reportSchema);

module.exports = Report;