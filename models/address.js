var mongoose = require('mongoose');
var AddressSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },    
    phone: {
      type: String,
      required: true,
      trim: true
    }
});

var Address = mongoose.model('Add', AddressSchema);
module.exports = Address;
