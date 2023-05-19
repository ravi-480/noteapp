const express = require("express")
const router = express.Router();
const{isLoggedIn}= require("../middleware/checkAuth")
const dashController = require("../controllers/dashController")

router.get("/dashboard",isLoggedIn,dashController.dashpage)

module.exports =router