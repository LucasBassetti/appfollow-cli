module.exports = {
  BASE_URL: 'http://api.appfollow.io/reviews',
  generateBasicAuth: (secretId) => {
    const token = Buffer.from(`${secretId}:`, 'utf8').toString('base64');
    return `Basic ${token}`;
  },
};
