const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Image = require('../models/image');

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File doesn't exist");
            return res.status(404).send('File not found');
        }

        // If file exists, send it
        res.sendFile(filePath);
    });
});

router.get('/image/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).send('Image not found');
        }

        // If image exists, send it
        res.json(image);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;