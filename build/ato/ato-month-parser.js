const xlsx = require('xlsx');
const dayjs = require('dayjs');
const { addMonthRates } = require('./ato-month-parser-rates.js');
const { getFirstDate, getDateRow } = require('./ato-month-parser-utils.js');

const parse = filename => {
  // Convert sheet to month object with rates
  const monthContainer = createMonthContainer(filename);
  addMonthRates(monthContainer);

  return createMonthDailyRates(monthContainer);
};

const createMonthContainer = filename => {
  const sheet = getSheet(filename);
  const month = {
    sheet,
    filename,
    range: xlsx.utils.decode_range(sheet['!ref'])
  };
  month.firstDate = getFirstDate(month);
  month.dateRow = getDateRow(month);
  return month;
};

const getSheet = filename => {
  // Get sheet from file
  const workbook = xlsx.readFile(filename);
  return workbook.Sheets[workbook.SheetNames[0]];
};

const createMonthDailyRates = month => {
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

module.exports = {
  parse
};
