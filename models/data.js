var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var dataSchema = new Schema({

    "Title":{"type":String},
    "Year":{"type":Number},
    "Category":{"type":String},
    "Institution":{"type":String},
    "Location":{"type":String},
    "Conference":{"type":String},
    "country":{"type":String},

}, {collection:'data'});

module.exports=mongoose.model('data',dataSchema);