const authenticate = require("../middleware/authenticate");
const { Router } = require("express");

const {
  getAll,
  getById,
  createUser,
  login,
  auth,
} = require("../controllers/controllers");

const router = Router();

router.get("/users", authenticate, getAll);

router.get("/users/:id", authenticate, getById);

router.post("/sign-up", createUser);

router.post("/sign-in", login);

router.post("/auth", authenticate, auth);

module.exports = router;
