const xlsx = require('xlsx');
const dayjs = require('dayjs');
const {
  addDailyRates: addDailyRatesForMonth
} = require('./ato-month-parser-rates.js');
const { getFirstDate, getDateRow } = require('./ato-month-parser-utils.js');

const parse = filename => {
  // Convert sheet to month object with rates
  const monthContainer = createMonthContainer(filename);
  addDailyRatesForMonth(monthContainer);

  return createMonthDailyRates(monthContainer);
};

const createMonthContainer = filename => {
  const sheet = getSheet(filename);
  const monthContainer = {
    sheet,
    filename,
    range: xlsx.utils.decode_range(sheet['!ref'])
  };
  monthContainer.firstDate = getFirstDate(monthContainer);
  monthContainer.dateRow = getDateRow(monthContainer);
  return monthContainer;
};

const getSheet = filename => {
  // Get sheet from file
  const workbook = xlsx.readFile(filename);
  return workbook.Sheets[workbook.SheetNames[0]];
};

const createMonthDailyRates = monthContainer => {
  const lastDate = dayjs(monthContainer.firstDate).date(
    monthContainer.firstDate.daysInMonth()
  );
  const firstDateRateEntry = Object.keys(monthContainer.rates)[0];
  const currencies = Object.keys(
    monthContainer.rates[firstDateRateEntry].currencies
  );

  return {
    rates: monthContainer.rates,
    firstDate: monthContainer.firstDate,
    lastDate,
    currencies
  };
};

module.exports = {
  parse
};
