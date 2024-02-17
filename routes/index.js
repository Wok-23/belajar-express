const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');
const FoodController = require('../controllers/food');
const UserController = require('../controllers/user');
const AuthController = require('../controllers/auth');
const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');

router.get('/', (req, res) => {
  res.send('hello word');
});
//auth route
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', AuthController.login);

router.use(authentication);
// Category route
router.post('/category', authorization, CategoryController.create);
router.get('/category', authorization, CategoryController.readAll);
router.get('/category/:id', authorization, CategoryController.readOne);
router.put('/category/:id', authorization, CategoryController.update);
router.delete('/category/:id', authorization, CategoryController.delete);
// Food route
router.post('/food', FoodController.create);
router.get('/food', FoodController.readAll);
router.get('/food/:id', FoodController.readOne);
router.put('/food/:id', FoodController.update);
router.delete('/food/:id', FoodController.delete);
//user route
router.post('/user', authorization, UserController.create);
router.get('/user', authorization, UserController.readAll);
router.get('/user/:id', authorization, UserController.readOne);
router.put('/user/:id', authorization, UserController.update);
router.delete('/user/:id', authorization, UserController.delete);

module.exports = router;
