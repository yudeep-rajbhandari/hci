
var mongoose=require('mongoose');
module.exports=function(app){
    app.mdb="mongodb+srv://yudeep123:yudeep123>@hci.xht35.mongodb.net/hci?retryWrites=true&w=majority";

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
