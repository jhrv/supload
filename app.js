var watch = require('watch');
var fs = require("fs");
var request = require('request');
var util = require("util");
var monitorFolder = process.env.MONITOR_FOLDER;
var stravaToken = process.env.STRAVA_TOKEN;

util.log("Using Strava token: " + stravaToken);

var options = {
    headers: {
        'Authorization': 'Bearer ' + stravaToken
    }
};

var callback = function optionalCallback(err, httpResponse, body) {
    if (err) {
        return util.error('Upload failed: ' + err);
    }
    util.log('Upload complete! Server responded with: ' + body);
};

var uploadActivity = function (file) {
    var postRequest = request.post('http://www.strava.com/api/v3/uploads', options, callback);

    var form = postRequest.form()
    form.append('file', fs.createReadStream(file));
    form.append('activity_type', 'ride');
    form.append('data_type', 'fit');
}

watch.createMonitor(monitorFolder, function (monitor) {
    util.log("Started monitoring " + monitorFolder);

    monitor.on("created", function (f, stat) {
        util.log("Detected new activity file " + f);
        uploadActivity(f);
    });

    monitor.on("removed", function (f, stat) {
        util.log(f + " was removed")
    });
});





