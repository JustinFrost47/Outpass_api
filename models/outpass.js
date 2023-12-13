const mongoose = require('mongoose');


// Define the outpass schema
const outpassSchema = new mongoose.Schema({
    // id: { type: Number, default: 1 },
    roll_no: { type: String, required: true },
    reason: { type: String, required: true },
  });



  // Create models from the schemas
  module.exports = mongoose.model('Outpass', outpassSchema);