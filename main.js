const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:user@cluster0.8vynf.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
MongoClient.connect(uri, function(err, client) {
    if (err) {
        throw err;
    }
});