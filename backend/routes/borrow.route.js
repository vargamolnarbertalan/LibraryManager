const express = require('express');
const app = express();
const BorrowRoute = express.Router();

// Patron model
let Patron = require('../models/Borrow');

// Add Patron
BorrowRoute.route('/createBorrow').post((req, res, next) => {
  Patron.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Patron
BorrowRoute.route('/allBorrow').get((req, res) => {
  Patron.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Patron
BorrowRoute.route('/readBorrow/:id').get((req, res) => {
  Patron.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Book
BorrowRoute.route('/updateBorrow/:id').put((req, res, next) => {
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
BorrowRoute.route('/deleteBorrow/:id').delete((req, res, next) => {
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

module.exports = BorrowRoute;
