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

module.exports = {
  getFirstDate,
  getDateRow
};
