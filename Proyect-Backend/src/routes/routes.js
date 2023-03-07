const authenticate = require("../middleware/authenticate");
const { Router } = require("express");

const {
  getAll,
  getById,
  createUser,
  login,
  edit,
  auth,
} = require("../controllers/controllers");

const router = Router();

router.get("/users", authenticate, getAll);

router.get("/users/:id", authenticate, getById);

router.post("/sign-up", createUser);

router.post("/sign-in", login);

router.put("/users/:id", authenticate, edit);

router.post("/auth", authenticate, auth);

module.exports = router;
