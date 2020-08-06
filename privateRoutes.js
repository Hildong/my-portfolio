const verifyToken = require("./verifyToken.js");
const db = require("./db.js");
const router = require("express").Router();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Bodyparser middleware to be able to read data from ReactJS
app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false})


//Default route, aka /admin/dashboard where the server loads login page for admin
router.get("/", verifyToken , (req, res) => {
    db.renderProjects(req, res)
})

//Logout admin by clearing cookie and redirecting to login pace
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect("http://www.philiphilding.com/admin");
})

//Add data from form and create project scheme in mongoDB
router.post('/addProject', urlencodedParser, db.upload.single("projectPictureName"), (req, res) => {
    db.addProject(req, res, req.body.projectName, req.body.projectTags, req.body.projectGithub, req.body.projectWebsite, req.body.projectDescription);
}) 

//Delete project 
router.post("/deleteproject", urlencodedParser, (req, res) => {
    console.log(req.body.projectName)
    db.removeProject(req, res, req.body.projectName)
})

module.exports = router 
