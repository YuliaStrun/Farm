const MongoClient = require("mongodb").MongoClient;
    
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);
async function run() {
    try {
        await mongoClient.connect();
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
run();