const fs = require('fs');
const { Parser } = require('json2csv');

async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function writeFile(data, path, configs) {
  const { format, csvDelimiter } = configs;
  let result = data;

  if (format === 'csv') {
    const json2csvParser = new Parser({ delimiter: csvDelimiter || '\t' });
    result = json2csvParser.parse(data);
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(path, result, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`File ${path} created successfully!`);
      }
    });
  });
}

module.exports = { readFile, writeFile };
