const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String },
  email: { type: String },
  prime: { type: Boolean }
});

mongoose.model('customer', CustomerSchema);
