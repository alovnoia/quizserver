'use strict';
var fs = require('fs');

// function to encode file data to base64 encoded string
exports.base64_encode = function (file) {
    // read binary data
    var bitmap = fs.readFileSync(imageUrl + file);
    // convert binary data to base64 encoded string
    return 'data:image/png;base64, ' + new Buffer(bitmap).toString('base64');
};

exports.base64_encode_raw = function (file) {
    // read binary data
    var bitmap = fs.readFileSync(imageUrl + file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
};

// function to create file from base64 encoded string
exports.base64_decode = function (base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(imageUrl + file, bitmap);
    console.log('******** File created from base64 encoded string ********');
};