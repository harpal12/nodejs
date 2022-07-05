var multer  = require('multer');
// const { dirname } = require('path');
const path =require("path");
var upload = multer({dest:'./uploads'});

//const util = require("util");
// console.log(__dirname+"../../uploads")


var storage = multer.diskStorage({


    destination: function (req, file, cb) {
console.log(req,"hellooo")

      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})


var upload = multer({ storage: storage });
//var upload = util.promisity(upload);
module.exports = {upload};