const dayjs = require('dayjs');
const xlsx = require('xlsx');
const currencyCodes = require('currency-codes');
const { dateKey } = require('./config.js');

// Country name strings that 'currency-codes' does not recognise
const countryToCurrencyCodeFallback = {
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

const addMonthRates = month => {
  const { sheet, dateRow } = month;

  // Loop through currency rows ⭣
  let row = dateRow + 1;
  const range = xlsx.utils.decode_range(sheet['!ref']);
  while (row <= range.e.r) {
    const currency = getCurrencyFromCountry(month, row);

    // Loop through date columns ⭢
    addRatesForCurrency(month, row, currency); // TODO: Improve

    row++;
  }
};

const getCurrencyFromCountry = ({ filename, sheet }, row) => {
  const cell = xlsx.utils.encode_cell({ c: 0, r: row });
  const val = sheet[cell] ? sheet[cell].v : '';

  const country = currencyCodes.country(val);

  if (country.length === 1) {
    return currencyCodes.code(country[0].code);
  } else {
    const code = countryToCurrencyCodeFallback[val.toLowerCase()];
    if (!code) {
      throw new Error(`No code or country found for '${val}' in ${filename}`);
    }
    return currencyCodes.code(code);
  }
};

const addRatesForCurrency = (month, row, currency) => {
  const { sheet, filename, firstDate } = month;
  // const range = xlsx.utils.decode_range(sheet['!ref']);
  for (let d = 1, last = firstDate.daysInMonth(); d <= last; d++) {
    const cell = xlsx.utils.encode_cell({ c: d, r: row });

    // Parse as string (.w) instead of number (.v) to validate expected precision with regex
    const rateStr = sheet[cell] ? sheet[cell].w : '';
    const hasRate = rateStr !== '';

    // Validate rate
    if (hasRate && !/^\d{1,4}\.\d{4}$/.test(rateStr)) {
      throw new Error(
        `Invalid rate (${rateStr}) in cell '${cell}' in ${filename}`
      );
    }

    const rate = hasRate ? sheet[cell].v : null;

    const date = dayjs(firstDate).date(d);
    const thisDateKey = dateKey(date);

    // Build: month.rates.<date>.currencies.<currency>.ato.<rate>
    month.rates = month.rates || {};
    month.rates[thisDateKey] = month.rates[thisDateKey] || { currencies: {} };
    month.rates[thisDateKey].currencies[currency.code] = { ato: rate };
  }
};

module.exports = {
  addMonthRates
};
