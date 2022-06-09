const express = require('express');
const app = express();
const BookRoute = express.Router();

// Patron model
let Patron = require('../models/Book');

// Add Patron
BookRoute.route('/createBook').post((req, res, next) => {
  Patron.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Patron
BookRoute.route('/allBook').get((req, res) => {
  Patron.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Patron
BookRoute.route('/readBook/:id').get((req, res) => {
  Patron.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Book
BookRoute.route('/updateBook/:id').put((req, res, next) => {
  Patron.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Book
BookRoute.route('/deleteBook/:id').delete((req, res, next) => {
  Patron.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = BookRoute;
