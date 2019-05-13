const xlsx = require('xlsx');
const getMonthData = require('./month-data.js').getData;

console.debug('Reading files');
const filename = 'data/April 2019 daily input.xlsx';
const workbook = xlsx.readFile(filename);

const sheet = workbook.Sheets[workbook.SheetNames[0]];
const file = getMonthData({ sheet, filename });

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
