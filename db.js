const mongoose = require("mongoose");
const schema = mongoose.Schema;
const multer = require("multer")
const fs = require("fs")
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoURI =  process.env.MONGODB_URI || "mongodb://localhost:27017/projects"
require("dotenv").config()


//Try to connect to user account database
mongoose.connect(mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true 
    }).then(() => {
        //If successfully connected to DB, log that in the console
        console.log("userDB connected to database successfully");
    }).catch(err => {
        //If not successfully connected to DB, log the error
        console.log(err);
});

//Create schema for creating projects
let projectSchema = new schema({
    projectName: String,
    projectTags: [String],
    githubLink: String,
    websiteLink: String, 
    projectPictureName: String,
    projectDescription: String
});

//Compile model from schema
let projectModel = mongoose.model('projectModel', projectSchema);


//Function for admin login and signing a jwt token for login
function login(req, res, uname, pwd) {
    if(uname === process.env.ADMIN && pwd === process.env.PASSWORD) {
        const username = process.env.ADMIN
        //Use JWT to authorize and send a token to user 
        const token = jwt.sign({username}, process.env.SECRET_TOKEN, { expiresIn: "1h" });
        //console.log(token)
        res.cookie("token", token).redirect("/admin/dashboard");
    } else {
        //If credentials are wrong, redirect to same page (basically refresh the page)
        console.log(`${uname}:${process.env.ADMIN} | ${pwd}:${process.env.PASSWORD}`)
        res.redirect("/admin")
    }
}


// SET STORAGE TO SAVE IMAGE
let storage = multer.diskStorage({
    //Set destination for where image should be saved   
    destination: (req, file, cb) => {
        //Save image in the frontend as well as in the backend
        cb(null, './views/static/pictures'+ file.originalname)
        cb(null, './portfolioFrontend/src/static/pictures'+file.originalname)
    }
})

//Store diskstorage in this upload variable 
let upload = multer({ storage: storage })


//Function for adding project
function addProject(req, res, projectName, projectTags, githubLink, websiteLink, projectDescription) {

    //Split string projectTags and make it an array, for projects with multiple tags
    let projectTagsArray = projectTags.split(".");

    //Create a new init of model and then save that model to mongoDB with data from args
    const project = new projectModel({
        projectName: projectName,
        projectTags: projectTagsArray,
        githubLink: githubLink,
        websiteLink: websiteLink,
        projectDescription: projectDescription
    })

    project
        .save()
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        })

    //Redirect to same page, basically a refresh
    res.redirect("http://www.philiphilding.com/admin/dashboard/")
}

//Function from removing project
function removeProject(req, res, projectName) {
    projectModel.findOne({"projectName": projectName}, (err, project) => {
        if(err) console.log(err);

        if(project) {
            try {
                //Remove picture from backend 
                fs.unlinkSync(path.join(__dirname, `/views/static/pictures/${projectName}.png`))
                //Remove picture from frontend
                fs.unlinkSync(path.join(__dirname, `/portfolioFrontend/src/static/pictures/${projectName}.png`))
            } catch(err) {
                //Console.log potential errors
                console.error(err)
            }

            project.remove();
            res.redirect("http://www.philiphilding.com/admin/dashboard/")
        } else {
            console.log("not found")
            res.redirect("http://www.philiphilding.com/admin/dashboard/")
        }
    })
}

//Function for rendering projects 
function renderProjects(req, res) {
    projectModel.find({}, (err, data) => {
        if(err) console.log(err);

        res.render("dashboard", {ProjectData: data})
    })
}

//Function for rendering projects to react
function sendProjectData(req, res) {
    projectModel.find({}, (err, data) => {
        if(err) console.log(err);

        res.json({ProjectData: data})
    })
}


module.exports = {login, addProject, removeProject, upload, renderProjects, sendProjectData}