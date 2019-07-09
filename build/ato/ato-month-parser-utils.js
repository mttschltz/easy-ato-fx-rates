const dayjs = require('dayjs');
const xlsx = require('xlsx');

const getFirstDateOfMonth = ({ filename, sheet }) => {
  const a1 = sheet['A1'] || {};
  const a1Value = a1.v || '';

  const monthFirstDate = dayjs(a1Value);

  if (!monthFirstDate.isValid() || monthFirstDate.date() !== 1) {
    throw new Error(`Could not extract month from A1 cell of '${filename}'`);
  }
  return monthFirstDate;
};

const getDateRowOfSheet = monthContainer => {
  const { filename, sheet } = monthContainer;
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

  validateColumnCount(monthContainer, range);
  validateColumnHeadings(monthContainer, range, row);

  // Return first country
  return row;
};

const validateColumnCount = ({ filename, firstDate }, range) => {
  // Validate number of columns (Country + dates + Average + Quuotes)
  if (range.e.c + 1 !== 1 + firstDate.daysInMonth() + 2) {
    throw new Error(
      `Unexpected number of columns (${range.e.c}) in ${filename}`
    );
  }
};

const validateColumnHeadings = (monthContainer, range, row) => {
  const { sheet } = monthContainer;
  for (let columnNum = 1; columnNum <= range.e.c; columnNum++) {
    const headingCell = xlsx.utils.encode_cell({ c: columnNum, r: row });
    const headingCellValue = sheet[headingCell] ? sheet[headingCell].w : '';
    validateColumnHeadingCell(
      monthContainer,
      headingCellValue,
      columnNum,
      range
    );
  }
};

const validateColumnHeadingCell = (
  { filename, firstDate },
  headingCellValue,
  columnNum,
  range
) => {
  // Second to last col: Average
  if (columnNum === range.e.c - 1) {
    if (headingCellValue.toLowerCase() !== 'average') {
      throw new Error(`Could not find 'average' col in ${filename}`);
    }
    return;
  }

  // Last col: Quotes
  if (columnNum === range.e.c) {
    if (headingCellValue.toLowerCase() !== 'quotes') {
      throw new Error(`Could not find 'quotes' col in ${filename}`);
    }
    return;
  }

  // Other (date) columns
  const date = dayjs(headingCellValue);
  if (
    !date.isValid() ||
    date.date() !== columnNum ||
    date.month() !== firstDate.month()
  ) {
    throw new Error(
      `Invalid or unexpected date (${headingCellValue}) in column ${columnNum} in ${filename}`
    );
  }
};

module.exports = {
  getFirstDateOfMonth,
  getDateRowOfSheet
};
