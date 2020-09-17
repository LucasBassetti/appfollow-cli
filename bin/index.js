#!/usr/bin/env node
"use strict";

var program = require('commander');

var pkg = require('../package.json');

var {
  parser
} = require('./parser');

var {
  parseReview
} = require('./reviews');

program.version(pkg.version);
program.command('reviews <secret_id> <ext_id>').option('-o --out <file>', 'output file name').option('-c --configs <file>', 'configs json file').description('Reference: https://appfollow.docs.apiary.io/#reference/0/3.-reviews').action(parser(parseReview));
program.parse(process.argv);