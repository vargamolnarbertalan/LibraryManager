const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Patron = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  Borrows: []
}, {
  collection: 'Patron'
})

module.exports = mongoose.model('Patron', Patron)
