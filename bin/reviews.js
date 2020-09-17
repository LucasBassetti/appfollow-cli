"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var axios = require('axios');

var qs = require('qs');

var {
  readFile,
  writeFile
} = require('./file');

var {
  BASE_URL,
  generateBasicAuth
} = require('./configs');

function parseReview(_x, _x2, _x3) {
  return _parseReview.apply(this, arguments);
}

function _parseReview() {
  _parseReview = _asyncToGenerator(function* (secretId, extId, options) {
    var configs = {};

    if (options.configs) {
      configs = JSON.parse(yield readFile(options.configs));
    }

    var reviews = yield generateReviews({
      secretId,
      extId,
      configs,
      page: 1
    });

    if (configs.out) {
      var result = yield writeFile(reviews, configs.out, configs);
      return result;
    }

    return JSON.stringify(reviews, null, 2);
  });
  return _parseReview.apply(this, arguments);
}

function generateReviews(_x4) {
  return _generateReviews.apply(this, arguments);
}

function _generateReviews() {
  _generateReviews = _asyncToGenerator(function* (_ref) {
    var {
      secretId,
      extId,
      configs,
      page
    } = _ref;
    var reviews = [];
    var {
      columns,
      params
    } = configs;

    var query = _objectSpread(_objectSpread({
      ext_id: extId
    }, params), {}, {
      page
    });

    var {
      data
    } = yield axios.get("".concat(BASE_URL, "?").concat(qs.stringify(query)), {
      headers: {
        Authorization: generateBasicAuth(secretId)
      }
    });
    var {
      list,
      page: newPage
    } = data.reviews;

    for (var item of list) {
      var review = {};

      for (var column of columns) {
        var [key, label] = column.split(':');

        if (item[key]) {
          review[label || key] = item[key].toString().replace(/\n/g, ' ');
        }
      }

      reviews.push(review);
    }

    if (newPage.next) {
      var newReviews = yield generateReviews({
        secretId,
        extId,
        configs,
        page: newPage.next
      });
      reviews = [...reviews, ...newReviews];
    }

    return reviews;
  });
  return _generateReviews.apply(this, arguments);
}

module.exports = {
  parseReview
};