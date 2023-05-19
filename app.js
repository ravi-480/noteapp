require("dotenv").config()
const express = require("express")
const expresslayout = require("express-ejs-layouts")
const connectdb = require("./server/config/db")
const session = require("express-session")
const passport = require("passport")
const mongostore = require("connect-mongo")
const ejs = require("ejs")
const MongoStore = require("connect-mongo")
const app = express()
const port = 5000 || process.env.PORT

app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
}))

app.use(passport.initialize())
app.use(passport.session())



app.use(express.urlencoded({extended:true}))
app.use(express.json())



//connect to databse
connectdb()


// static file
app.use(express.static("public"))


//template engine
app.use(expresslayout)
app.set("layout","./layouts/main")
app.set("view engine", "ejs")



//Routes
app.use('/',require("./server/routes/auth"))
app.use('/',require("./server/routes/index"))
app.use('/',require("./server/routes/dashboard"))




app.get("*",(req,res)=>{
    res.status(404).render("404")
})















app.listen(port,()=>{console.log("connected to server");})