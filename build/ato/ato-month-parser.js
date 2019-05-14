const xlsx = require('xlsx');
const dayjs = require('dayjs');
const { addMonthRates } = require('./ato-month-parser-rates.js');
const { getFirstDate, getDateRow } = require('./ato-month-parser-utils.js');

const parse = filename => {
  // Get sheet from file
  const workbook = xlsx.readFile(filename);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert sheet to month object with rates
  const month = createEmptyMonth(sheet, filename);
  addMonthRates(month);

  const lastDate = dayjs(month.firstDate).date(month.firstDate.daysInMonth());
  const firstDateRateEntry = Object.keys(month.rates)[0];
  const currencies = Object.keys(month.rates[firstDateRateEntry].currencies);

  return {
    rates: month.rates,
    firstDate: month.firstDate,
    lastDate,
    currencies
  };
};

const createEmptyMonth = (sheet, filename) => {
  const month = {
    sheet,
    filename,
    range: xlsx.utils.decode_range(sheet['!ref'])
  };
  month.firstDate = getFirstDate(month);
  month.dateRow = getDateRow(month);
  return month;
};

module.exports = {
  parse
};
