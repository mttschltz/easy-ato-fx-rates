const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const atoMonthParser = require('./ato-month-parser.js').parse;
const { firstDate, lastDate } = require('../index-utils.js');
const { dateKey } = require('../config.js');

// Use an extension whitelist to avoid lock files from spreadsheet apps, etc.
const atoAllowedExtensions = ['.xlsx'];

const getDailyRates = () => {
  const dailyRates = readFromFiles();

  // TODO: Reenable
  // validateNoMissingDates(dailyRates);

  // TODO: Calculate average/nearest/etc

  return dailyRates;
};

const readFromFiles = () => {
  return fs
    .readdirSync('data/ato')
    .filter(filename => atoAllowedExtensions.includes(path.extname(filename)))
    .reduce((allRates, filename) => {
      const monthRates = atoMonthParser('data/ato/' + filename);

      // Update dates
      allRates.firstDate = firstDate(allRates, monthRates);
      allRates.lastDate = lastDate(allRates, monthRates);

      // Update currencies list
      allRates.currencies = allRates.currencies || new Set();
      allRates.currencies = new Set([
        ...allRates.currencies,
        ...monthRates.currencies
      ]);

      // Merge new month rates
      allRates.rates = Object.assign({}, allRates.rates, monthRates.rates);
      return allRates;
    }, {});
};

const validateNoMissingDates = dailyRates => {
  const { firstDate, lastDate, rates } = dailyRates;
  // start from firstDate
  let dateIterator = dayjs(firstDate);
  while (!dateIterator.isAfter(lastDate)) {
    const key = dateKey(dateIterator);
    if (!rates[key]) {
      throw new Error(`Missing an ATO Daily Rate for ${dateIterator.format()}`);
    }
    dateIterator = dateIterator.add(1, 'day');
  }
};

module.exports = {
  getDailyRates
};
