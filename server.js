//Require modules and exported functions
const path = require("path");
const exhbs = require("express-handlebars");
const Handlebars = require("handlebars")
const express = require("express");
const bodyParser = require("body-parser");
const privateRoutes = require("./privateRoutes.js");
const db = require("./db.js");
const cors = require("cors");
const mail = require("./mail.js");
const app = express();

//Create port variable and let it either have port of heroku id or localhost port 8000
const port = process.env.PORT || 8000;


//MIDDLEWARE

//Route middleware
app.use("/admin/dashboard", privateRoutes);

//Bodyparser middleware to be able to read data from ReactJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Use cors middleware to allow cross-origin HTTP requests
app.use(cors());

//Middleware for static files as css and JS
app.use('/static', express.static(path.join(__dirname, './views/static')))

//Handlebars middleware
app.engine('handlebars', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "/views/layouts")
}));
app.set("view engine", "handlebars")


//Custom handlebars registerHelper. Note, this helper doesn't execute properly if arrow function is used as CB function, so use normal function() as CB
Handlebars.registerHelper('project_pic_name', function() {
    return `/static/pictures/${this.projectName}.png`
})

Handlebars.registerHelper('projectName', function() {
    return this.projectName
})


//GET requests

//Admin login page
app.get("/admin", (req, res) => {
    res.render("login")
})

app.get("/api", (req, res) => {
    res.json({"yes": "bruhs"});
})

app.get("/projectdata", (req, res) => {
    db.sendProjectData(req, res);
}) 

//POST requests from NodeJS
app.post('/signin', (req, res) => {
    db.login(req, res, req.body.uname, req.body.pwd)
})

//POST requests from ReactJS
app.post('/mail', (req, res) => {
    //Call the mail function from mail file
    mail(req.body.name, req.body.email, req.body.msg);
})


//If project is in production, connect and use react 
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/portfolioFrontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/portfolioFrontend/build/index.html'));
    });
}

app.set("port", port)

//Start up the server
app.listen(port, () => console.log(`Listening to requests on port ${port}`));