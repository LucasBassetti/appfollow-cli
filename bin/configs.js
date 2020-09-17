"use strict";

module.exports = {
  BASE_URL: 'http://api.appfollow.io/reviews',
  generateBasicAuth: secretId => {
    var token = Buffer.from("".concat(secretId, ":"), 'utf8').toString('base64');
    return "Basic ".concat(token);
  }
};