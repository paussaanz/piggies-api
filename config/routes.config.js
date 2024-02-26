const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const formController = require('../controllers/form.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('./storage.config');


// Auth
router.post('/login', authController.doLogin);

// Users
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.getUser)
router.post('/register', upload.single('imageUrl'), usersController.create);

// Form
router.post('/form', formController.create)
router.get('/form', formController.dashboard)


module.exports = router;