var watch = require('watch');
var fs = require("fs");
var request = require('request');
var util = require("util");
var monitorFolder = process.env.MONITOR_FOLDER;
var stravaToken = process.env.STRAVA_TOKEN;

util.log("Using Strava token: " + stravaToken);

//var opts = {
//    host: 'www.strava.com',
//    path: '/api/v3/uploads',
//
//}

//var options = {
//    uri: "http://www.strava.com/api/v3/uploads",
//    method: "POST",
//    headers: {
//        'Authorization': 'Bearer ' + stravaToken
//    }
//};
var options = {
    headers: {
        'Authorization': 'Bearer ' + stravaToken
    }
};
//var callback = function (error, response, body) {
//    console.log(body);
//    console.log(error);
//    console.log(response);
//};

var upload = function (file) {
    var r = request.post('http://www.strava.com/api/v3/uploads', options, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    })

    var form = r.form()
    form.append('activity_type', 'ride');
    form.append('data_type', 'fit');
    form.append('file', fs.createReadStream(file));
}

upload("/Users/hrv/workspace/supload/johnny.fit");
upload("/Users/hrv/workspace/supload/testing/balle.fit");

//watch.createMonitor(monitorFolder, function (monitor) {
//    util.log("Started monitoring " + monitorFolder);
//
//    monitor.on("created", function (f, stat) {
//        util.log("Detected new activity file " + f);
//
//        var test = request.post(options, callback);
//
//        var form = test.form();
//        var readStream = fs.createReadStream(f);
//        form.append('file', readStream);
//        console.log("created read stream");
//        form.append('activity_type', 'ride');
//        form.append('data_type','fit');
//
//        console.log("done!");
//        readStream.destroy();
//
//    });
//
//    monitor.on("removed", function (f, stat) {
//        util.log(f + " was removed")
//    });
//});


//watch.createMonitor(monitorFolder, function (monitor) {
//    util.log("Started monitoring " + monitorFolder);
//
//    monitor.on("created", function (f, stat) {
//        util.log("Detected new activity file " + f);
//        var FormData = require("form-data");
//        var form = new FormData();
//        var fs = require("fs");
//        form.append('file', fs.createReadStream(f));
//        console.log("created read stream");
//        form.append('activity_type', 'ride');
//        form.append('data_type','fit');
//        form.submit(opts, submitHandler);
//        console.log("submitted....");
//    });
//
//    monitor.on("removed", function (f, stat) {
//        util.log(f + " was removed")
//    });
//});
//
//var submitHandler = function (err, res) {
//
//    if (err){
//        console.log("got err")
//        throw err;
//    }
//
//    if (res.statusCode === 201) {
//        util.log("Activity successfully uploaded to Strava");
//    } else {
//        util.log("Unable to upload activity to Strava, status code " + res.statusCode);
//        res.on('data', function (chunk) {
//            if (chunk){
//                util.log("chunk:" + chunk);
//            } else {
//                util.log("no chunk in data");
//            }
//
//            util.log("Error: " + JSON.parse(chunk).error);
//        });
//    }
//
//}





