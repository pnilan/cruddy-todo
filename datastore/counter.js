const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0; // ID is auto-incrementing counter stored in memory to identify ToDo entries

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////


/*1) Unique Identified -
 All todo entries are identified by an auto-incrementing id. Currently, that id is a counter stored in memory. Your first goal is to save the current state of the counter to the hard drive, so it's persisted between server restarts. Do this by rewriting getNextUniqueId to make use of the provided readCounter and writeCounter functions.

Commit your progress: "Complete getNextUniqueId"
*/


exports.getNextUniqueId = (callback) => {
  // 1. Read current counter value from counter.txt file
  // 2. Overwrite file with counter+1
  // ?? error first callback pattern?

  readCounter((err, count) => {
    writeCounter(count + 1, callback);
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
