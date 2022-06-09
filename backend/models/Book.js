const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Book = new Schema({
  Title: {
    type: String
  },
  Writer: {
    type: String
  },
  Publisher: {
    type: String
  },
  ISBN: {
    type: String
  },
  Released: {
    type: Date
  },
  NumberOfPages: {
    type: Number
  },
  OG_Price: {
    type: Number
  },
  status: {
    type: String,
    enum: ["AVAILABLE", "BORROWED", "SCRAPPED"],
    default: "AVAILABLE"
  }
}, {
  collection: 'Books'
})

module.exports = mongoose.model('Book', Book)
