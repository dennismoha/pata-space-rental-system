const express = require('express');
const category = require('../controller/category');

const cateRoute = express.Router();


cateRoute.post('/category/new_category',category.createCategory);
cateRoute.get('/category/get_category',category.getCategories);
module.exports = cateRoute