const fs = require('fs');
const path = require('path');
const atoMonthParser = require('./ato-month-parser').parse;
const { firstDate, lastDate } = require('./index-utils.js');

// Use an extension whitelist to avoid lock files from spreadsheet apps, etc.
const atoAllowedExtensions = ['.xlsx'];

console.debug('Starting to read files');
const atoDailyRates = fs
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

// TODO: Validate that dates are consecutive

// TODO: Calculate average/nearest/etc

// Process
// 1. Get ATO data in an array or someting like
// date:
//   CAD: rate
//   USD: rate
// date2: null
// ... order doesnt matter
//
// parse... find: earliest, latest, list of currencies
// add them FIRST to the central object... then use day.js to start from earliest and .add(1) to get to latest
//
// 2. Central object looks something like:
// {
//   start: '2017-?-?,
//   end:   '2019-?-?',
//   '2019-01-01': {
//     currencies: {
//       CAD: {
//         ato: null,
//         atoNearestEarlier: null,
//         atoNearestLater: null,
//         atoNearestAverage: null
//       }
//     }
//   }
//
// 3. Then take the currencies and start and end date, and use to get from RBA

// Use cases:
// 1. Lookup single date + multiple countries
// 2. Lookup date range + multiple countries

console.debug('Done');
