#Goals
*Create a system that can parse urls and their sub-urls.
*We want a DB of URLs and their parsed HTML page.

##How to run
1. clone this repo
2. run these docker commands
$ docker run -p 6379:6379 -d redis
$ docker run --name scraper-mongo -p 27017:27017 -d mongo
3. npm install
4. run node app.js
5. run node worker.js


#Thought process#
1. Should be scalable.
2. I haven't touched node.js in almost a year so the solution needs to be simple to create.

In order to have it easier to scale in the future I chose to use a pattern of task-queue.
1. request is made with URLs to the API
2. API is saving the Task in a task queue (Redis)
3. Worker is picking up the tasks and process them.

Because the tasks are saved in redis and the api.js and worker.js are seperated it will be easy to have more servers working the tasks if needed.

##What to test##
##Integration##
1. Is a mongo connection available?
2. Is a Redis connection available?
3. Is the contract expected upheld? (body.urls for example)

##Unit##
1. Is an error thrown when no mongo/redis connections?
2. If data is found regarding a url are ignoring it?
3. If data is not found are we scraping the url?
