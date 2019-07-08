const dayjs = require('dayjs');
const xlsx = require('xlsx');
const currencyCodes = require('currency-codes');
const { dateToKey } = require('../config.js');

// Country name strings that 'currency-codes' does not recognise
const COUNTRY_TO_CURRENCY_SPECIAL_CASE_MAP = {
  europe: 'EUR',
  hongkong: 'HKD',
  'new caledonia/tahiti': 'XPF',
  'new cal/tahiti': 'XPF',
  philippines: 'PHP',
  saudi: 'SAR',
  switzerland: 'CHF',
  'united arab emirates': 'AED',
  uk: 'GBP',
  usa: 'USD'
};

const addDailyRates = monthContainer => {
  const { sheet, dateRow } = monthContainer;

  // Loop through currency rows ⭣
  let row = dateRow + 1;
  const range = xlsx.utils.decode_range(sheet['!ref']);
  while (row <= range.e.r) {
    const currency = getCurrencyForRow(monthContainer, row);

    // Loop through date columns ⭢
    addRatesForCurrency(monthContainer, row, currency);
    row++;
  }
};

const getCurrencyForRow = ({ filename, sheet }, row) => {
  const firstCellInRow = xlsx.utils.encode_cell({ c: 0, r: row });
  const countryStr = sheet[firstCellInRow] ? sheet[firstCellInRow].v : '';

  const country = currencyCodes.country(countryStr);
  if (country.length === 1) {
    return currencyCodes.code(country[0].code);
  } else {
    const currencyCode =
      COUNTRY_TO_CURRENCY_SPECIAL_CASE_MAP[countryStr.toLowerCase()];
    if (!currencyCode) {
      throw new Error(
        `No code or country found for '${countryStr}' in ${filename}`
      );
    }
    return currencyCodes.code(currencyCode);
  }
};

const addRatesForCurrency = (monthContainer, row, currency) => {
  const { firstDate } = monthContainer;

  const lastDateCol = firstDate.daysInMonth();
  for (let dateCol = 1; dateCol <= lastDateCol; dateCol++) {
    const rate = getRateFromCell(monthContainer, dateCol, row);
    const dateKey = getDateKeyFromCol(monthContainer, dateCol);

    // Build: monthContainer.rates.<date>.currencies.<currency>.ato.<rate>
    monthContainer.rates = monthContainer.rates || {};
    monthContainer.rates[dateKey] = monthContainer.rates[dateKey] || {
      currencies: {}
    };
    monthContainer.rates[dateKey].currencies[currency.code] = { ato: rate };
  }
};

const getRateFromCell = (monthContainer, c, r) => {
  const { sheet, filename } = monthContainer;
  const cell = xlsx.utils.encode_cell({ c, r });

  // Parse as string (.w) instead of number (.v) to validate expected precision with regex
  const rateStr = sheet[cell] ? sheet[cell].w : '';
  const hasRate = rateStr !== '';

  // Validate rate format
  if (hasRate && !/^\d{1,4}\.\d{4}$/.test(rateStr)) {
    throw new Error(
      `Invalid rate (${rateStr}) in cell '${cell}' in ${filename}`
    );
  }

  return hasRate ? sheet[cell].v : null;
};

const getDateKeyFromCol = (monthContainer, dateCol) => {
  const dateFromColNum = dayjs(monthContainer.firstDate).date(dateCol);
  return dateToKey(dateFromColNum);
};

module.exports = {
  addDailyRates
};
