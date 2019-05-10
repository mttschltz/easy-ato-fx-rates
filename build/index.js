const xlsx = require('xlsx');
const getMonthData = require('./month-data.js').getData;

console.debug('Reading files');
const filename = 'data/April 2019 daily input.xlsx';
const workbook = xlsx.readFile(filename);

const sheet = workbook.Sheets[workbook.SheetNames[0]];
const file = getMonthData({ sheet, filename });

console.debug('Done');
