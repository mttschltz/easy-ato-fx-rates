const monthMap = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
};

const getData = sheet => {
  const month = getMonth(sheet);
  console.debug('Month done: ' + month);
  return {
    month
  };
};

const getMonth = sheet => {
  const a1 = sheet['A1'] || {};
  const a1Value = a1.v || '';

  const yearIndex = a1Value.search(/\d{4}/);
  const year = parseInt(a1Value.substring(yearIndex, yearIndex + 4));
  const textBeforeYear = a1Value.substring(0, yearIndex - 1); // -1 accounts for space
  const monthIndex = textBeforeYear.lastIndexOf(' ') + 1; // +1 accounts for space
  const month = monthMap[textBeforeYear.substring(monthIndex).toLowerCase()];

  if (!a1) {
    console.error('Could not extract month from A1 cell.');
    return null;
  }
  return year * 100 + month;
};

module.exports = {
  getData
};
