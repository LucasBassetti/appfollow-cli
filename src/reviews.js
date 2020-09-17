const axios = require('axios');
const qs = require('qs');
const { readFile, writeFile } = require('./file');
const { BASE_URL, generateBasicAuth } = require('./configs');

async function parseReview(secretId, extId, options) {
  let configs = {};

  if (options.configs) {
    configs = JSON.parse(await readFile(options.configs));
  }

  const reviews = await generateReviews({ secretId, extId, configs, page: 1 });

  if (configs.out) {
    const result = await writeFile(reviews, configs.out, configs);

    return result;
  }

  return JSON.stringify(reviews, null, 2);
}

async function generateReviews({ secretId, extId, configs, page }) {
  let reviews = [];
  const { columns, params } = configs;

  const query = {
    ext_id: extId,
    ...params,
    page,
  };

  const { data } = await axios.get(`${BASE_URL}?${qs.stringify(query)}`, {
    headers: { Authorization: generateBasicAuth(secretId) },
  });

  const { list, page: newPage } = data.reviews;

  for (const item of list) {
    const review = {};

    for (const column of columns) {
      const [key, label] = column.split(':');

      if (item[key]) {
        review[label || key] = item[key].toString().replace(/\n/g, ' ');
      }
    }

    reviews.push(review);
  }

  if (newPage.next) {
    const newReviews = await generateReviews({ secretId, extId, configs, page: newPage.next });
    reviews = [...reviews, ...newReviews];
  }

  return reviews;
}

module.exports = { parseReview };
