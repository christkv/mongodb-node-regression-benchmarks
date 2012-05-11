var spawn = require('child_process').spawn;

//
// Run the test suite multiple times, one for the 0.9.8.X, 0.9.9.X and 1.0.X, and master
//

// Start by fetch the git repo, the run the tests on different tags + master
//https://github.com/mongodb/node-mongodb-native
var fetchGitRepo = function(branch, callback) {
  // Remove the directory if it exists
  var rm = spawn("rm", ["-rf", "./node-mongodb-native"]);
  rm.on("exit", function() {
    // Set up git repo command
    var git = spawn("git", ["clone", "https://github.com/mongodb/node-mongodb-native.git"]);
    git.stdout.on("data", function (data) { process.stdout.write(data); });
    git.stderr.on("data", function (data) { process.stdout.write(data); });

    // Execute the git fetch command
    git.on("exit", function() {      
      // Let's switch the tag
      git = spawn("git", ["--exec-path=./node-mongodb-native", "--git-dir=./node-mongodb-native/.git", "checkout", branch]);
      git.stdout.on("data", function (data) { process.stdout.write(data); });
      git.stderr.on("data", function (data) { process.stdout.write(data); });
      // Execute the git fetch command
      git.on("exit", function() {      
        callback();
      });
    });    
  });  
}

var executeBenchmarks = function(branch, callback) {
  // We fetch a git repository
}

// Fetch the git repo
fetchGitRepo("V0.9.8", function() {
  // Execute benchmarks against a specific tag or branch
})