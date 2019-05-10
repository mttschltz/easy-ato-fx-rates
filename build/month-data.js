const dayjs = require('dayjs');

const getData = file => {
  const month = getMonth(file);

  console.debug('Month done: ' + month.format());
  return {
    month
  };
};

const getMonth = ({ sheet, filename }) => {
  const a1 = sheet['A2'] || {};
  const a1Value = a1.v || '';

  const month = dayjs(a1Value);

  if (!month.isValid() || month.day() !== 1) {
    throw new Error(`Could not extract month from A1 cell of '${filename}'`);
  }
  return month;
};

module.exports = {
  getData
};
