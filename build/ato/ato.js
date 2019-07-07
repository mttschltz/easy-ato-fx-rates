const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const atoMonthParser = require('./ato-month-parser.js').parse;
const { firstDate, lastDate } = require('../index-utils.js');
const { dateKey } = require('../config.js');

// Use an extension whitelist to avoid lock files from spreadsheet apps, etc.
const ALLOWED_EXTENSIONS = ['.xlsx'];

const getDailyRates = () => {
  const dailyRates = readFromFiles();

  // TODO: Reenable
  // validate(dailyRates);

  // TODO: Calculate average/nearest/etc

  return dailyRates;
};

const readFromFiles = () => {
  return fs
    .readdirSync('data/ato')
    .filter(filename => ALLOWED_EXTENSIONS.includes(path.extname(filename)))
    .reduce(mergeMonthDailyRatesFromFile, {});
};

const mergeMonthDailyRatesFromFile = function(allRates, filename) {
  const monthDailyRates = atoMonthParser('data/ato/' + filename);

  updateAllRatesDates(allRates, monthDailyRates);
  updateAllRatesCurrencies(allRates, monthDailyRates);
  updateAllRatesRates(allRates, monthDailyRates);

  return allRates;
};

const updateAllRatesDates = function(allRates, monthDailyRates) {
  allRates.firstDate = firstDate(allRates, monthDailyRates);
  allRates.lastDate = lastDate(allRates, monthDailyRates);
};

const updateAllRatesCurrencies = function(allRates, monthDailyRates) {
  allRates.currencies = allRates.currencies || new Set();
  allRates.currencies = new Set([
    ...allRates.currencies,
    ...monthDailyRates.currencies
  ]);
};

const updateAllRatesRates = function(allRates, monthDailyRates) {
  allRates.rates = Object.assign({}, allRates.rates, monthDailyRates.rates);
};

const validate = dailyRates => {
  validateAllDatesExistBetweenFirstAndLast(dailyRates);
  validateExpectedNumberOfDates(dailyRates);
};

const validateAllDatesExistBetweenFirstAndLast = function(dailyRates) {
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
};

const validateExpectedNumberOfDates = function(dailyRates) {
  const { firstDate, lastDate, rates } = dailyRates;

  const totalDays = lastDate.diff(firstDate, 'day') + 1;
  if (Object.keys(rates).length !== totalDays) {
    throw new Error(
      `Found ${
        Object.keys(rates).length
      } rate entries, instead of the expected ${totalDays}`
    );
  }
};

module.exports = {
  getDailyRates
};
