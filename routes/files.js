const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Image = require('../models/image');
const {authenticate} = require("../middlewares/auth");

router.get('/:filename', (req, res) => {
    const filename = path.basename(req.params.filename);

    if (!isValidFilename(filename)) {
        console.error("Invalid filename");
        return res.status(400).send('Bad Request. Invalid filename');
    }

    const filePath = path.join(__dirname, '../uploads', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File doesn't exist");
            return res.status(404).send('File not found');
        }
        res.sendFile(filePath);
    });
});

router.get('/image/:id', authenticate,  async (req, res) => {
    const id = req.params.id;

    try {
        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.json(image);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;

function isValidFilename(filename) {
    const regex = /^[a-zA-Z0-9_.-]+$/;
    return !filename.includes("..") && regex.test(filename);
}