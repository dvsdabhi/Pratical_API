const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/signup",userController.createUser);
router.post("/signin",userController.userLogin);
router.get("/allUser",userController.AllUser);
router.delete("/delete/:id",userController.deleteUser);
router.put("/update/:id",userController.updateUser);
router.get("/singleUser/:id",userController.getSingleUser);

module.exports = router;