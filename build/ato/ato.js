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
  // validateExpectedDates(dailyRates);

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

const validateExpectedDates = dailyRates => {
  const { firstDate, lastDate, rates } = dailyRates;

  // Ensure all dates between firstDate and lastDate exist (inclusive)
  let dateIterator = dayjs(firstDate);
  while (!dateIterator.isAfter(lastDate)) {
    const key = dateKey(dateIterator);
    if (!rates[key]) {
      throw new Error(`Missing an ATO Daily Rate for ${dateIterator.format()}`);
    }
    dateIterator = dateIterator.add(1, 'day');
  }

  // Ensure no extraneous dates
  const totalDays = lastDate.diff(firstDate, 'day') + 1;
  if (Object.keys(rates).length !== totalDays) {
    throw new Error(
      `Found ${
        Object.keys(rates).length
      } rate entries, instead of the expected ${totalDays}`
    );
  }
};

const addFallbackRates = dailyRates => {
  // closestOrEarliest
  // closestOrLatest
  // closestOrAverage
  // Loop through dates
  // If null:
  // Find closest earlier and days between
  // Find closest later and days between
  // closestOrEarliest -> use closest if available, or earlier
  // closestOrLatest -> use closest if available, or later
  // closestOrAverage -> use closest if available, or average both
  //
  // For edge cases:
  // Start: if 'earlier' is before firstDate... days between = 999
  // End: if 'later' is after lastDate... days between = 999
  // And in both cases... can only use latest or earliest.... no average
};

module.exports = {
  getDailyRates
};
