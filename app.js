  var watch = require('watch')
  watch.createMonitor('/Users/hrv/Documents/workspace/supload/testing', function (monitor) {
    //monitor.files['/Users/hrv/Documents/workspace/supload/testing'] // Stat object for my zshrc.
    monitor.on("created", function (f, stat) {
      console.log("created something!" + f);
      console.log("stat = " + stat);
    })
    monitor.on("changed", function (f, curr, prev) {
      // Handle file changes
      console.log("something changed...")
    })
    monitor.on("removed", function (f, stat) {
      console.log("something was removed")
    })
    //monitor.stop(); // Stop watching
  })
