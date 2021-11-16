const express = require("express");
const fs = require("fs");
const multer  = require('multer')

const app = express();

app.use(express.static("public"));
app.use(express.static("uploads"));



app.set("view engine","ejs");

const storage = multer.diskStorage({
  destination: function(req, file , callback)
  {
    if(req.path === "/")
    {
      callback(null, "uploads/profile")
    }
    else
    {
      callback(null, "uploads/todo")
    }
  },
  filename: function(req, file , callback)
  {
    callback(null, file.originalname);
  },
})

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file , callback)
  {
    console.log(file)
    if(file.size < 8000)
    {
      callback(null, true);
    }
    else
    {
      callback("not allowed", false);
    }
  }, 
})

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

