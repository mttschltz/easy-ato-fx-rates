const xlsx = require('xlsx');
const getMonthData = require('./month-data.js').getData;

console.debug('Reading files');
const workbook = xlsx.readFile('data/April 2019 daily input.xlsx');

const sheet = workbook.Sheets[workbook.SheetNames[0]];
console.debug(JSON.stringify(getMonthData(sheet)));

console.debug('Done');
