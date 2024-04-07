const multer = require("multer");

const defaultStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        console.log(extArray);
        let extension = extArray[extArray.length - 1];
        console.log(extension);
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
})

const upload = multer({ storage: defaultStorage });

module.exports = upload;