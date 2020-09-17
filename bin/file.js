"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var {
  Parser
} = require('json2csv');

function readFile(_x) {
  return _readFile.apply(this, arguments);
}

function _readFile() {
  _readFile = _asyncToGenerator(function* (path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
  return _readFile.apply(this, arguments);
}

function writeFile(_x2, _x3, _x4) {
  return _writeFile.apply(this, arguments);
}

function _writeFile() {
  _writeFile = _asyncToGenerator(function* (data, path, configs) {
    var {
      format,
      csvDelimiter
    } = configs;
    var result = data;

    if (format === 'csv') {
      var json2csvParser = new Parser({
        delimiter: csvDelimiter || '\t'
      });
      result = json2csvParser.parse(data);
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(path, result, err => {
        if (err) {
          reject(err);
        } else {
          resolve("File ".concat(path, " created successfully!"));
        }
      });
    });
  });
  return _writeFile.apply(this, arguments);
}

module.exports = {
  readFile,
  writeFile
};