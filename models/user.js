/**
 * Created by USER on 7/29/2017.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema = new Schema({
    "name":{"type":String},
    "userName" : {"type" : String},
    "password" : {"type" : String },
    "role":{"type"  : String},

    "number" : {"type" : Number},

}, {collection:'user'});
userSchema.pre('save', function(next) {
    var usr=this;
    usr.password =usr.password;
    next();
})
userSchema.methods.compare=function(password,callback){

    console.log(this.password);
    console.log((password));
    callback( this.password==password);

    var hash=function(password,callback){
        callback(md5(password));
    }


}


module.exports=mongoose.model('user',userSchema);
