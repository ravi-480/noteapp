const express = require("express")
const router = express.Router();
const mainController = require("../controllers/mainController")



// app route

router.get("/",mainController.homepage)
router.get("/about",mainController.aboutpage)






module.exports = router