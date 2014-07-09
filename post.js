var FormData = require("form-data");
var fs = require("fs");

var form = new FormData();

var filePath = '/Users/hrv/balle.fit';
form.append('file', fs.createReadStream(filePath));

var opts = {
  host: 'www.strava.com',
  path: '/api/v3/uploads?activity_type=ride&data_type=fit',
  headers: {
    'Authorization': 'Bearer 997cbe0998b3f8cb35049f7bc4bafcb82d24f856',
  }
}

form.submit(opts, function(err, res) {
  if (res.statusCode === 201){
     console.log("Uploaded activity file %s to Strava", filePath);
  } else {
     console.log("Unable to upload activity file %s to Strava", filePath);
     res.on('data', function(chunk){
         console.log("Error: %s", JSON.parse(chunk).error);
     });
  }
  res.resume();

});