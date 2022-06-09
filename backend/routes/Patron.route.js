const express = require('express');
const app = express();
const PatronRoute = express.Router();

// Patron model
let Patron = require('../models/Patron');

// Add Patron
PatronRoute.route('/createPatron').post((req, res, next) => {
  Patron.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Patron
PatronRoute.route('/allPatron').get((req, res) => {
  Patron.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Patron
PatronRoute.route('/readPatron/:id').get((req, res) => {
  Patron.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Book
PatronRoute.route('/updatePatron/:id').put((req, res, next) => {
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
PatronRoute.route('/deletePatron/:id').delete((req, res, next) => {
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

module.exports = PatronRoute;
