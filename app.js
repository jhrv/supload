var watch = require('watch');
var FormData = require("form-data");
var fs = require("fs");
var util = require("util");


watch.createMonitor(process.env.MONITOR_FOLDER, function (monitor) {
    monitor.on("created", function (f, stat) {
        util.log("Uploading activity file " + f);
        var form = new FormData();
        form.append('file', fs.createReadStream(f));
        form.submit(opts, submitHandler);
    });
    monitor.on("removed", function (f, stat) {
        util.log(f + " was removed")
    });
});

var opts = {
    host: 'www.strava.com',
    path: '/api/v3/uploads?activity_type=ride&data_type=fit',
    headers: {
        'Authorization': 'Bearer ' + process.env.STRAVA_TOKEN
    }
}

var submitHandler = function (err, res) {
    if (res.statusCode === 201) {
        util.log("Activity successfully uploaded to Strava");
    } else {
        util.log("Unable to upload activity to Strava");
        res.on('data', function (chunk) {
            util.log("Error: " + JSON.parse(chunk).error);
        });
    }
    res.resume();
}



