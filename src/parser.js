const ora = require('ora');

const parser = (fn) => async (...args) => {
  const spinner = ora({
    text: 'Generating...',
    color: 'yellow',
  });

  spinner.start();

  try {
    const result = await fn(...args);

    spinner.stop();

    console.log(result);
  } catch (error) {
    spinner.stop();

    console.log(error.message);
  }
};

module.exports = { parser };
