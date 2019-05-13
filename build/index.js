const fs = require('fs');
const path = require('path');
const atoMonthParser = require('./ato-month-parser').parse;

// Use an extension whitelist to avoid lock files from spreadsheet apps, etc.
const atoAllowedExtensions = ['.xlsx'];

console.debug('Reading files');

const atoDailyRates = fs
  .readdirSync('data/ato')
  .filter(filename => atoAllowedExtensions.includes(path.extname(filename)))
  .reduce((allRates, filename) => {
    const monthRates = atoMonthParser('data/ato/' + filename);
    return Object.assign({}, allRates, monthRates);
  }, {});
// const filename = 'data/April 2019 daily input.xlsx';
// const workbook = ;

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
