// Get earliest first date from allRates or monthRates
const firstDate = (allRates, monthRates) => {
  if (!allRates.firstDate) {
    return monthRates.firstDate;
  }
  const allRatesIsBefore = allRates.firstDate.isBefore(monthRates.firstDate);
  return allRatesIsBefore ? allRates.firstDate : monthRates.firstDate;
};

// Get latest last date from allRates or monthRates
const lastDate = (allRates, monthRates) => {
  if (!allRates.lastDate) {
    return monthRates.lastDate;
  }
  const allRatesIsAfter = allRates.lastDate.isAfter(monthRates.lastDate);
  return allRatesIsAfter ? allRates.lastDate : monthRates.lastDate;
};

module.exports = {
  firstDate,
  lastDate
};
