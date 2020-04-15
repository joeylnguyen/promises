/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var git = require('./promisification.js');
var pluck = require('./promiseConstructor.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluck.pluckFirstLineFromFileAsync(readFilePath)
    .then(git.getGitHubProfileAsync)
    .then(profile => {
      var writeFileAsync = Promise.promisify(fs.writeFile);

      writeFileAsync(writeFilePath, JSON.stringify(profile));
    });


  // return pluck.pluckFirstLineFromFileAsync(readFilePath)
  //   .then(git.getGitHubProfileAsync)
  //   .then(profile => {
  //     return new Promise((resolve, reject) => {
  //       fs.writeFile(writeFilePath, JSON.stringify(profile), (err, res) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(res);
  //         }
  //       });
  //     });
  //   });


  // return pluck.pluckFirstLineFromFileAsync(readFilePath)
  //   .then(user => {
  //     if (!user) {
  //       throw new Error(`Could not read file: ${readFilePath}`);
  //     } else {
  //       return user;
  //     }
  //   })
  //   .then(user => {
  //     return git.getGitHubProfileAsync(user);
  //   })
  //   .then(profile => {
  //     return new Promise((resolve, reject) => {
  //       fs.writeFile(writeFilePath, JSON.stringify(profile), (err, res) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(res);
  //         }
  //       });
  //     });
  //   });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
