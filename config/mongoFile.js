
var mongoose=require('mongoose');
module.exports=function(app){
    app.mdb="mongodb://yudeep123:yudeep123@hci-shard-00-00.xht35.mongodb.net:27017,hci-shard-00-01.xht35.mongodb.net:27017,hci-shard-00-02.xht35.mongodb.net:27017/hci?ssl=true&replicaSet=atlas-pem8dx-shard-0&authSource=admin&retryWrites=true&w=majority";

    //app.mdb="mongodb://localhost:27017/takeinfood";
    mongoose.set('debug', true);


    var db = mongoose.connection;
    db.on('connecting', function() {
        console.log('connecting to MongoDB...');
    });

    db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function() {
        app.enable('mongodb');
        console.log('MongoDB connected!');
    });
    db.once('open', function() {
        console.log('MongoDB connection opened!');
    });
    db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });
    db.on('disconnected', function() {
        app.disable('mongFodb');
        console.log('MongoDB disconnected!');
        mongoose.connect(app.mdb, {server:{auto_reconnect:true}});
    });
    mongoose.connect(app.mdb, {server:{auto_reconnect:true}});
};
