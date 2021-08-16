require('dotenv').config();
const queue = require('./scrapingTasksQueue').createTasksQueue()
const parse = require('lusha-mock-parser');
const urlsRepository = require('./urlsRepository')

function main() {
    urlsRepository.connect()
        .then(console.log('Connected successfully to urlsRepository'))
}

main()

queue.on('ready', async function () {
    queue.process(async (job, done) => {

        const url = job.data
        var dataFound = await urlsRepository.getUrlData(url)

        if (dataFound.length === 0) {
            console.log(`scraping ${url}`)
            const parsingResult = parse(url)
            parsingResult.links.forEach(async element => {
                await queue.createJob(element).save()
            });
            await urlsRepository.saveUrlData(url, parsingResult.html, parsingResult.links)
        }

        done()
    });

    console.log('processing jobs...');
});