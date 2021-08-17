require('dotenv').config();
const express = require('express');
const http = require('http');
const queue = require('./scrapingTasksQueue').createTasksQueue()
const urlsRepository = require('./urlsRepository')
const app = express();
const { body, validationResult } = require('express-validator');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function main() {
    urlsRepository.connect()
        .then(console.log('Connected successfully to server'))
}

main()

// Routes
app.post('/scrape',
    body('urls').isArray({ min: 1 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        req.body.urls.forEach(async element => {
            await queue.createJob(element).save()
        });
        res.send("😋 We'll be taking care of businness ");
    });

app.post('/debug', async (req, res) =>{
    res.json(await urlsRepository.getUrlData())
})

// Create and start the server
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`scraper listening at:${PORT}`);
});