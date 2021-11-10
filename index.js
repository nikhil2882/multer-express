const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("public"))
app.use(express.static("uploads"))

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })

app.set("view engine", "ejs");

app.post("/", upload.single("profile_pic") ,function(req, res)
{
  console.log(req.file);

  writeFile(req.file.path, function()
  {
    res.send("file sucess");
  })
})

app.get("/home", function(req, res)
{

  readFile(function(data)
  {
    res.render("home",{ url : data})
  })
})



app.listen(3000, function()
{
  console.log("server at  3000");
})

function readFile(callback)
{
  fs.readFile("./db.txt", "utf-8", function(err, data)  
  {
    callback(data);
  })
}

function writeFile(data, callback)
{
  fs.writeFile("./db.txt",data, function(err)  
  {
    callback();
  })
}