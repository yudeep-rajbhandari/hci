/**
 * Created by USER on 7/22/2017.
 */

var express=require('express');
var router=express.Router();
var model=require('./../models/data.js');


router.get('/getdata',function (req,res,next) {

    model.find(function (err,data) {
        console.log('<<<<<<<<');
        console.log('<<<<<<<<');
        if(err){
            throw (err);
        }
        if(!err){
            res.status(200).json({ success: true, data: data })
            console.log(data);
        }
        else {
            next (err);
        }
    })

})
router.post('/savedata',function (req,res,next) {
    var info= new model(req.body.savedata);
    console.log(info);
    info.save(function (err,data) {
        if(err){
            throw (err);
        }
        else{
            res.status(200).json({success:true,data:data});
        }
    })

})

router.get('/findData',function(req,res,next){
    model.find({},function (err,data) {
        if(err){
            throw(err);
        }
        else{

            res.status(200).json({succcess:true,data:data})
        }
    })

})
router.post('/search',function(req,res,next){
    console.log("<<<<<<<");
    console.log(req.body.searchData);
    var newinfo= req.body.searchData;
    console.log(newinfo);
    //var searchdata= new model(req.body.searchData);
    //console.log(info);
    model.find({'Title':new RegExp('.*'+newinfo+'*.') },function (err,data) {
        if(err){
            throw (err);
        }
        else{
            res.status(200).json({success:true,data:data})
            console.log(data);
        }

    })

})
router.post("/deletedata",function (req,res,next) {
    console.log("<<<<<<<<<<<<<");
    model.remove({_id: {$in:req.body.deletedata}},function (err,data) {
        if(err){
            throw (err);
        }
        else{
            res.status(200).json({success:true,data:data})
            console.log(data);
        }
    })

})

module.exports = router;
