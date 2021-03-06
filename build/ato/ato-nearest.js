const dayjs = require('dayjs');
const { dateToKey } = require('../config.js');
const currency = require('currency.js');

const MAX_DAYS_BETWEEN = 4; // Easter long weekend might be the longest consecutive unavailable range

const add = (missingDate, currencyCode, dailyRates) => {
  const { rates, firstDate, lastDate } = dailyRates;
  if (!rates[dateToKey(missingDate)].currencies[currencyCode]) {
    return;
  }

  const earlierFallback = getEarlierDate(
    missingDate,
    currencyCode,
    rates,
    firstDate
  );
  const earlierDateDiff =
    earlierFallback === null
      ? null
      : missingDate.diff(earlierFallback.dates[0], 'day');

  const laterFallback = getLaterDate(
    missingDate,
    currencyCode,
    rates,
    lastDate
  );
  const laterDateDiff =
    laterFallback === null
      ? null
      : laterFallback.dates[0].diff(missingDate, 'day');

  const missingDays =
    (typeof earlierDateDiff === 'number' ? earlierDateDiff : 0) +
    (typeof laterDateDiff === 'number' ? laterDateDiff : 0) -
    1;
  if (missingDays > MAX_DAYS_BETWEEN) {
    throw new Error(
      `Number of missing days between rates (${missingDays}) greater than the max (${MAX_DAYS_BETWEEN}), when adding fallbacks for ${missingDate.format(
        'YYYY-MM-DD'
      )}`
    );
  }

  const nearestOrEarlier = (
    earlierDateDiff,
    laterDateDiff,
    earlierFallback,
    laterFallback,
    missingDate
  ) => {
    if (earlierDateDiff === null && laterDateDiff === null) {
      throw new Error(
        `atoNearestOrEarlier could not be calculated for ${missingDate}`
      );
    }
    earlierDateDiff = earlierDateDiff === null ? 999 : earlierDateDiff;
    laterDateDiff = laterDateDiff === null ? 999 : laterDateDiff;

    return earlierDateDiff <= laterDateDiff ? earlierFallback : laterFallback;
  };

  const nearestOrLater = (
    earlierDateDiff,
    laterDateDiff,
    earlierFallback,
    laterFallback,
    missingDate
  ) => {
    if (earlierDateDiff === null && laterDateDiff === null) {
      throw new Error(
        `atoNearestOrLater could not be calculated for ${missingDate}`
      );
    }
    earlierDateDiff = earlierDateDiff === null ? 999 : earlierDateDiff;
    laterDateDiff = laterDateDiff === null ? 999 : laterDateDiff;

    return laterDateDiff <= earlierDateDiff ? laterFallback : earlierFallback;
  };

  const nearestOrAverage = (
    earlierDateDiff,
    laterDateDiff,
    earlierFallback,
    laterFallback,
    missingDate
  ) => {
    // If
    if (earlierDateDiff === null && laterDateDiff === null) {
      throw new Error(
        `atoNearestOrLater could not be calculated for ${missingDate}`
      );
    }
    earlierDateDiff = earlierDateDiff === null ? 999 : earlierDateDiff;
    laterDateDiff = laterDateDiff === null ? 999 : laterDateDiff;

    if (earlierDateDiff < laterDateDiff) {
      return earlierFallback;
    } else if (laterDateDiff < earlierDateDiff) {
      return laterFallback;
    }

    const rateObject = currency(earlierFallback.rate, {
      precision: 5,
      errorOnInvalid: true
    })
      .add(laterFallback.rate)
      .distribute(2)[0];
    return {
      rate: parseFloat(rateObject),
      dates: [earlierFallback.dates[0], laterFallback.dates[0]]
    };
  };

  const currencyRates = rates[dateToKey(missingDate)].currencies[currencyCode];
  currencyRates.atoNearestOrEarlier = nearestOrEarlier(
    earlierDateDiff,
    laterDateDiff,
    earlierFallback,
    laterFallback,
    missingDate
  );
  currencyRates.atoNearestOrLater = nearestOrLater(
    earlierDateDiff,
    laterDateDiff,
    earlierFallback,
    laterFallback,
    missingDate
  );
  currencyRates.atoNearestOrAverage = nearestOrAverage(
    earlierDateDiff,
    laterDateDiff,
    earlierFallback,
    laterFallback,
    missingDate
  );
};

// TODO: Important!! What if currency is not available for one inbetweeen month?!

const getEarlierDate = (missingDate, currencyCode, rates, firstDate) => {
  const maxDiff = Math.min(
    MAX_DAYS_BETWEEN,
    missingDate.diff(firstDate, 'day')
  );
  if (maxDiff === 0) {
    return null;
  }

  let earlierDate = dayjs(missingDate).subtract(1, 'day');
  for (let i = 1; i <= maxDiff; i++) {
    const currencyRates =
      rates[dateToKey(earlierDate)].currencies[currencyCode];
    if (!currencyRates) {
      // Currency not available (maybe only for more recent dates)
      return null;
    }
    const atoRate = currencyRates.ato;
    if (typeof atoRate === 'number') {
      // Rate found for date
      return {
        rate: atoRate,
        dates: [earlierDate]
      };
    }
    // Rate not available for date
    earlierDate = earlierDate.subtract(1, 'day');
  }

  if (earlierDate.isBefore(firstDate)) {
    return null;
  }

  throw new Error(
    `Could not find earlier date for ATO rate than ${earlierDate.format(
      'YYYY-MM-DD'
    )} within constraints`
  );
};
const getLaterDate = (missingDate, currencyCode, rates, lastDate) => {
  const maxDiff = Math.min(MAX_DAYS_BETWEEN, lastDate.diff(missingDate, 'day'));
  if (maxDiff === 0) {
    return null;
  }

  let laterDate = dayjs(missingDate).add(1, 'day');
  for (let i = 1; i <= maxDiff; i++) {
    const currencyRates = rates[dateToKey(laterDate)].currencies[currencyCode];
    if (!currencyRates) {
      // Currency not available (maybe only for more recent dates)
      return null;
    }
    const atoRate = currencyRates.ato;
    if (typeof atoRate === 'number') {
      // Rate found for date
      return {
        rate: atoRate,
        dates: [laterDate]
      };
    }
    // Rate not available for date
    laterDate = laterDate.add(1, 'day');
  }

  if (laterDate.isAfter(lastDate)) {
    return null;
  }

  throw new Error(
    `Could not find later date for ATO rate than ${laterDate.format(
      'YYYY-MM-DD'
    )} within constraints`
  );
};

module.exports = {
  add
};
