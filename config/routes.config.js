const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const serviceController = require("../controllers/service.controller");
const tasksController = require("../controllers/tasks.controller");
const authController = require("../controllers/auth.controller");
const formController = require("../controllers/form.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("./storage.config");

// Auth
router.post("/login", authController.doLogin);

// Users
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);
router.get(
  "/users/:id",
  authMiddleware.isAuthenticated,
  usersController.getUser
);
router.post("/register", upload.single("imageUrl"), usersController.create);

// Form
router.post("/form", formController.createForm);
router.get("/form", formController.getForms);

// Tasks
router.get("/tasks", tasksController.getAllTasks);
router.get("/tasks/form/:formId", tasksController.getTasksByForm);
router.get("/tasks/service/:serviceId", tasksController.getTasksByService);

// Services
router.get("/services", serviceController.getServices);

module.exports = router;
