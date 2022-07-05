const res = require("express/lib/response");

module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");
    var router =require("express").Router();
    const {upload} = require('../middleware/imagesupload.js');
    //create a new Tutorial
    router.post("/", tutorials.create);
    //Retrieve all Tutorials
    router.get("/", tutorials.findAll);
    //Retrieve all published Tutorials
    router.get("/published",tutorials.findAllPublished);
    //Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
    //Upadte a Tutorial with id
    router.put("/:id",tutorials.update);
    //Delete a Tutorial with id 
    router.delete("/:id",tutorials.delete);
    //Delete all Tutorials

    router.post('/profile-upload-single', upload.array("profile-file",10), function (req, res, next) {
        // req.file is the profile-file file
        // req.body will hold the text fields, if there were any
        console.log(JSON.stringify(req.file))
        var response = '<a href="/">Home</a><br>'
        response += "Files uploaded successfully.<br>"
        response += `<img src="${req.file.path}" /><br>`
        return res.send(response)
      })

      router.post("/user ",(req,res) => {
        res.send(token);
      });





    
    router.delete("/", tutorials.deleteAll);
    app.use('/api/tutorials',router);

};

