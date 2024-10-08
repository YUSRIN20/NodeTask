import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Upload image endpoint
app.post('/upload', async (req, res) => {
    const { imageUrl } = req.body;
    const filename = `${uuidv4()}.jpeg`; // Generating a unique filename
    console.log("Filename:", filename);
    
    const filepath = path.join(uploadDir, filename);
    console.log("Filepath:", filepath);
    
    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(filepath))
            .on('finish', () => res.send({ message: "Image Saved", filepath }))
            .on('error', (error) => {
                console.error("Error writing to file:", error); 
                res.status(500).send('Error saving file');
            });
    } catch (error) {
        console.error("Error fetching image:", error); 
        res.status(500).send('Error fetching image');
    }
});

// Get uploaded image
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename; 
    const filePath = path.join(uploadDir, filename); 

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Image not found'); 
        }

        res.sendFile(filePath); 
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
