const mongoose = require('mongoose');



// Define the student schema
const studentSchema = new mongoose.Schema({
  roll_no: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  parent_mobile: { type: String, required: true },
  outpasses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Outpass'}], 
});


module.exports = mongoose.model('Student', studentSchema);

