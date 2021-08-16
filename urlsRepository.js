//mongo
const { MongoClient } = require('mongodb')
let client
let db
let collection

async function connect() {
    client = new MongoClient(process.env.MONGO_URL)
    db = client.db('urlScraping')
    collection = db.collection('urlData')
    await client.connect();
    return client;
}

async function getUrlData(url){
    if(url){
        return await collection.find({_id:url}).toArray()
    } else{
        return  await collection.find({}).toArray()
    }
}

async function saveUrlData(url, html, links){
    await collection.insertMany([{_id: url, html, links}])
}

module.exports = {
    connect,
    saveUrlData,
    getUrlData
}