var express = require('express');
var router = express.Router();
var model = require('./../models/user.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {
    model.findOne({userName: req.body.user.userName}, function (err, data) {
        if (err) throw err;
        if (!data) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            data.compare(req.body.user.password, function (match) {
                if (match) {
                    res.json({success: true, user: data});
                }
                else {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                }
            })

        }
    })

});


module.exports = router;
