const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const serviceController = require("../controllers/service.controller");
const tasksController = require("../controllers/tasks.controller");
const authController = require("../controllers/auth.controller");
const formController = require("../controllers/form.controller");
const messageController = require("../controllers/message.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("./storage.config");

// Auth
router.post("/login", authController.doLogin);

// Users
router.get("/users/me", authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get( "/users", usersController.getUsers);
router.get("/users/:id", authMiddleware.isAuthenticated, usersController.getUser);
router.post("/register", upload.single("imageUrl"), usersController.createUser);
router.post("/edit/:id", upload.single("imageUrl"), usersController.updateUser);


// Form
router.get('/forms/:id/tasks', formController.acceptedFormsTasks)
router.get("/forms", formController.getForms);
router.post("/forms", formController.createForm);
router.post("/forms/:id/accept", formController.doAcceptForm);
router.post("/forms/contact/:id", formController.contactClient);

// Tasks
router.get("/tasks", tasksController.getAllTasks);
router.get("/tasks/form/:formId", tasksController.getTasksByForm);
router.get("/tasks/service/:serviceId", tasksController.getTasksByService);
router.post('/tasks/:taskId/status', tasksController.updateTaskStatus);
router.post('/addUserToTask/:taskId', tasksController.addUsersToTask);
router.put('/tasks/:taskId', tasksController.editTask);

// Services
router.get("/services", serviceController.getServices);

// Messages
router.get("/messages/:room", messageController.getMessageHistory)

module.exports = router;
