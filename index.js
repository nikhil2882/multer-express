const express = require("express");
const fs = require("fs");
const multer  = require('multer')

const app = express();

app.use(express.static("public"));
app.use(express.static("uploads"));



app.set("view engine","ejs");

const upload = multer({ dest: "uploads" })

app.post("/", upload.single("profile_pic"), function(req, res)
{
  console.log(req.file);

  fs.writeFile("db.txt",req.file.filename, function()
  {
    res.send("its a success")
  })
})

app.get("/profile", function(req, res)
{
  fs.readFile("db.txt", "utf-8", function(err, data)
  {
    res.render("home", { url: data });
  })
})

app.listen(3000, function()
{
  console.log("server at  3000");
})

