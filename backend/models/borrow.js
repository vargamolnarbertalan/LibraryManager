const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Borrow = new Schema({
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  RentedBook: [],
  Patron: {
    type: String
  }
}, {
  collection: 'Borrows'
})

module.exports = mongoose.model('Borrow', Borrow)
