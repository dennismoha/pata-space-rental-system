const express = require('express');
const review = require('../controller/reviews')
const commentRoute = express.Router();

commentRoute.post('/review/:id/new',review.newReview)


module.exports = commentRoute