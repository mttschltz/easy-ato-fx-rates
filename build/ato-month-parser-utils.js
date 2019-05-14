const dayjs = require('dayjs');
const xlsx = require('xlsx');

const getFirstDate = month => {
  const a1 = month.sheet['A1'] || {};
  const a1Value = a1.v || '';

  const monthFirstDate = dayjs(a1Value);

  if (!monthFirstDate.isValid() || monthFirstDate.date() !== 1) {
    throw new Error(
      `Could not extract month from A1 cell of '${month.filename}'`
    );
  }
  return monthFirstDate;
};

const getDateRow = ({ sheet, filename, firstDate }) => {
  // Find row with dates
  const range = xlsx.utils.decode_range(sheet['!ref']);
  let row = 0;
  while (row < range.e.r) {
    row++; // Increment at beginning of block, so it can never increment more than the total row count
    const cell = xlsx.utils.encode_cell({ c: 0, r: row });
    const val = sheet[cell] ? sheet[cell].v : '';
    if (val.toLowerCase() === 'country') {
      break;
    }
  }
  if (row === range.e.r) {
    throw new Error(`Could not find date row in ${filename}`);
  }

  // Validate number of columns (Country + dates + Average + Quuotes)
  if (range.e.c + 1 !== 1 + firstDate.daysInMonth() + 2) {
    throw new Error(
      `Unexpected number of columns (${range.e.c}) in ${filename}`
    );
  }

  // Validate other columns
  for (let col = 1; col <= range.e.c; col++) {
    const cell = xlsx.utils.encode_cell({ c: col, r: row });
    const val = sheet[cell] ? sheet[cell].w : '';
    validateDateCell(val, col, range, firstDate, filename);
  }

  // Return first country
  return row;
};

const validateDateCell = (val, col, range, month, filename) => {
  // Second to last col: Average
  if (col === range.e.c - 1) {
    if (val.toLowerCase() !== 'average') {
      throw new Error(`Could not find 'average' col in ${filename}`);
    }
    return;
  }
  // Last col: Quotes
  if (col === range.e.c) {
    if (val.toLowerCase() !== 'quotes') {
      throw new Error(`Could not find 'quotes' col in ${filename}`);
    }
    return;
  }
  // Date columns
  const date = dayjs(val);
  if (
    !date.isValid() ||
    date.date() !== col ||
    date.month() !== month.month()
  ) {
    throw new Error(
      `Invalid or unexpected date (${val}) in column ${col} in ${filename}`
    );
  }
};

// const getCurrencyRates = ({ sheet, filename }, month, currencyRow) => {
//   const range = xlsx.utils.decode_range(sheet['!ref']);
//   const monthData = {};

//   let row = currencyRow;
//   while (row <= range.e.r) {
//     const cell = xlsx.utils.encode_cell({ c: 0, r: row });
//     const val = sheet[cell] ? sheet[cell].v : '';

//     // Check currency
//     const currency = getCurrencyFromCountry({ filename }, val);
//     // get rates for dates
//     getRateValues({ sheet, filename }, month, monthData, row, currency);
//     row++;
//   }
//   return monthData;
// };

// const countryToCurrencyFallback = {
//   europe: 'EUR',
//   hongkong: 'HKD',
//   'new caledonia/tahiti': 'XPF',
//   'new cal/tahiti': 'XPF',
//   philippines: 'PHP',
//   saudi: 'SAR',
//   switzerland: 'CHF',
//   'united arab emirates': 'AED',
//   uk: 'GBP',
//   usa: 'USD'
// };

// const getCurrencyFromCountry = ({ filename }, val) => {
//   const country = currencyCodes.country(val);

//   if (country.length === 1) {
//     return currencyCodes.code(country[0].code);
//   } else {
//     const code = countryToCurrencyFallback[val.toLowerCase()];
//     if (!code) {
//       throw new Error(`No code or country found for '${val}' in ${filename}`);
//     }
//     return currencyCodes.code(code);
//   }
// };

// const getDateKey = date => date.format('YYYY-MM-DD');

// const getRateValues = (
//   { sheet, filename },
//   month,
//   monthData,
//   row,
//   currency
// ) => {
//   // const range = xlsx.utils.decode_range(sheet['!ref']);
//   for (let d = 1, last = month.daysInMonth(); d <= last; d++) {
//     const cell = xlsx.utils.encode_cell({ c: d, r: row });

//     // Parse as string (.w) instead of number (.v) to validate expected precision with regex
//     const rateStr = sheet[cell] ? sheet[cell].w : '';
//     const hasRate = rateStr !== '';

//     // Validate rate
//     if (hasRate && !/^\d{1,4}\.\d{4}$/.test(rateStr)) {
//       throw new Error(
//         `Invalid rate (${rateStr}) in cell '${cell}' in ${filename}`
//       );
//     }

//     const rate = hasRate ? sheet[cell].v : null;

//     const date = dayjs(month).date(d);
//     const dateKey = getDateKey(date);
//     monthData[dateKey] = monthData[dateKey] || { currencies: {} };
//     monthData[dateKey].currencies[currency.code] = { ato: rate };
//   }
// };

module.exports = {
  getFirstDate,
  getDateRow
};
