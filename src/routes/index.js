const { Router } = require("express");
const router = Router();

const {
  getUsers,
  getUserById,
  getLoginAuthentication,
  createUser,
  deleteUser,
} = require("../controllers/index.controller");

router.get("/", getUsers);
router.get("/finduser", getUserById);
router.get("/login/:email/:password", getLoginAuthentication);
router.post("/adduser", createUser);
router.delete("/deleteuser", deleteUser);

module.exports = router;
