const xlsx = require('xlsx');
const getMonthRates = require('./month-data.js').getMonthRates;

const parse = filename => {
  const workbook = xlsx.readFile(filename);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return getMonthRates({ sheet, filename });
};
module.exports = {
  parse
};
