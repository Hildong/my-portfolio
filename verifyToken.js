const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express()
require("dotenv").config()


app.use(cookieParser())

module.exports = function (req, res, next) {
    let token = undefined
    const authHeader = req.headers["cookie"].split(" ")[0];
    console.log(`${authHeader} is`)
    if(authHeader !== undefined) {
        token = authHeader.substring(6)
        console.log(token)
    } else if(token === null || token === undefined) return res.status(401).redirect("/admin")
    console.log(token)
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if(err) {
            console.log(err)
            res.status(403).send("Access denied");
        } else {  
            req.user = user; 
            next();
        }
    })
}
