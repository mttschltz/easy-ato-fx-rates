const add = require('../../build/ato/ato-nearest.js').add;
const dayjs = require('dayjs');

describe('ato-nearest.js', () => {
  let dailyRates;

  beforeEach(() => {
    dailyRates = {
      rates: {
        '2019-05-01': { currencies: { CUR: { ato: 0.0001 } } },
        '2019-05-02': { currencies: { CUR: { ato: 0.0002 } } },
        '2019-05-03': { currencies: { CUR: { ato: 0.0003 } } },
        '2019-05-04': { currencies: { CUR: { ato: 0.0004 } } },
        '2019-05-05': { currencies: { CUR: { ato: 0.0005 } } },
        '2019-05-06': { currencies: { CUR: { ato: 0.0006 } } },
        '2019-05-07': { currencies: { CUR: { ato: 0.0007 } } },
        '2019-05-08': { currencies: { CUR: { ato: 0.0008 } } },
        '2019-05-09': { currencies: { CUR: { ato: 0.0009 } } },
        '2019-05-10': { currencies: { CUR: { ato: 0.001 } } }
      },
      firstDate: dayjs('1 May 2019'),
      lastDate: dayjs('10 May 2019')
    };
  });
  describe('touching firstDate', () => {
    describe('one missing |[❓] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-01'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-01'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to day after |[❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0002);
      });
      it('sets atoNearestOrLater to day after |[❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0002);
      });
      it('sets atoNearestOrAverage to day after |[❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0002);
      });
    });
    describe('two missing |[❓] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-01'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-01'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 2 days after |[❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-03'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0003);
      });
      it('sets atoNearestOrLater to 2 days after |[❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-03'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0003);
      });
      it('sets atoNearestOrAverage to 2 days after |[❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-03'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0003);
      });
    });
    describe('three missing |[❓] [ ] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-01'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-01'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 3 days after |[❓] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-04'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0004);
      });
      it('sets atoNearestOrLater to 3 days after |[❓] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-04'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0004);
      });
      it('sets atoNearestOrAverage to 3 days after |[❓] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-04'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0004);
      });
    });
    describe('four missing |[❓] [ ] [ ] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-01'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-01'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 4 days after |[❓] [ ] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0005);
      });
      it('sets atoNearestOrLater to 4 days after |[❓] [ ] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0005);
      });
      it('sets atoNearestOrAverage to 4 days after |[❓] [ ] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0005);
      });
    });
    describe('five missing |[❓] [ ] [ ] [ ] [ ] [r]', () => {
      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
      });

      it("throws Error as we don't expect > 4 days gap between available rates", () => {
        // Execute
        expect(() => {
          add(dayjs('2019-05-01'), 'CUR', dailyRates);
        }).toThrow();
      });
    });
    describe('second of four missing |[ ] [❓] [ ] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-02'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-02'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 3 days after |[ ] [❓] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0005);
      });
      it('sets atoNearestOrLater to 3 days after |[ ] [❓] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0005);
      });
      it('sets atoNearestOrAverage to 3 days after |[ ] [❓] [ ] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0005);
      });
    });
    describe('third of four missing |[ ] [ ] [❓] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-03'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-03'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 2 days after |[ ] [ ] [❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0005);
      });
      it('sets atoNearestOrLater to 2 days after |[ ] [ ] [❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0005);
      });
      it('sets atoNearestOrAverage to 2 days after |[ ] [ ] [❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0005);
      });
    });
    describe('fourth of four missing |[ ] [ ] [ ] [❓] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-04'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-04'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 1 day after |[ ] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0005);
      });
      it('sets atoNearestOrLater to 1 day after |[ ] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0005);
      });
      it('sets atoNearestOrAverage to 1 day after |[ ] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0005);
      });
    });
  });

  describe('touching lastDate', () => {
    describe('one missing [r] [❓]|', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-10'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-10'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-10'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to day before [✓r] [❓]|', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-09'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0009);
      });
      it('sets atoNearestOrLater to day before [✓r] [❓]|', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-09'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0009);
      });
      it('sets atoNearestOrAverage to day before [✓r] [❓]|', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-09'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0009);
      });
    });
    describe('two missing [r] [ ] [❓]|', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-10'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-09'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-10'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-10'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 2 days before [✓r] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-08'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0008);
      });
      it('sets atoNearestOrLater to 2 days before [✓r] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-08'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0008);
      });
      it('sets atoNearestOrAverage to 2 days before [✓r] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-08'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0008);
      });
    });
    describe('three missing [r] [ ] [ ] [❓]|', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-10'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-09'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-08'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-10'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-10'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 3 days before [✓r] [ ] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0007);
      });
      it('sets atoNearestOrLater to 3 days before [✓r] [ ] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0007);
      });
      it('sets atoNearestOrAverage to 3 days before [✓r] [ ] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0007);
      });
    });
    describe('four missing [r] [ ] [ ] [ ] [❓]|', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-10'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-09'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-08'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-07'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-10'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-10'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 4 days before [✓r] [ ] [ ] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0006);
      });
      it('sets atoNearestOrLater to 4 days before [✓r] [ ] [ ] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0006);
      });
      it('sets atoNearestOrAverage to 4 days before [✓r] [ ] [ ] [ ] [❓]|', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0006);
      });
    });
    describe('five missing [r] [ ] [ ] [ ] [❓]|', () => {
      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-10'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-09'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-08'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-07'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-06'].currencies.CUR.ato = null;
      });

      it("throws Error as we don't expect > 4 days gap between available rates", () => {
        // Execute
        expect(() => {
          add(dayjs('2019-05-10'), 'CUR', dailyRates);
        }).toThrow();
      });
    });
    describe('second to last of four missing [r] [ ] [ ] [❓] [ ]|', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-10'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-09'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-08'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-07'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-09'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-09'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 3 days before [✓r] [ ] [ ] [❓] [ ]|', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0006);
      });
      it('sets atoNearestOrLater to 3 days before [✓r] [ ] [ ] [❓] [ ]|', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0006);
      });
      it('sets atoNearestOrAverage to 3 days before [✓r] [ ] [ ] [❓] [ ]|', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0006);
      });
    });
    describe('third to last of four missing [r] [ ] [❓] [ ] [ ]|', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-10'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-09'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-08'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-07'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-08'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-08'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 2 days before [✓r] [ ] [❓] [ ] [ ]|', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0006);
      });
      it('sets atoNearestOrLater to 2 days before [✓r] [ ] [❓] [ ] [ ]|', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0006);
      });
      it('sets atoNearestOrAverage to 2 days before [✓r] [ ] [❓] [ ] [ ]|', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0006);
      });
    });
    describe('fourth to last of four missing [r] [❓] [ ] [ ] [ ]|', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-10'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-09'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-08'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-07'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-07'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-07'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to 1 day before [✓r] [❓] [ ] [ ] [ ]|', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0006);
      });
      it('sets atoNearestOrLater to 1 day before [✓r] [❓] [ ] [ ] [ ]|', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0006);
      });
      it('sets atoNearestOrAverage to 1 day before [✓r] [❓] [ ] [ ] [ ]|', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0006);
      });
    });
  });

  describe('in between firstDate and lastDate', () => {
    describe('one missing [r] [❓] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-03'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-03'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to day before [✓r] [❓] [r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0002);
      });
      it('sets atoNearestOrLater to day after [r] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-04'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0004);
      });
      it('sets atoNearestOrAverage to average of day before and after [½r] [❓] [½r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrAverage.dates[1]).toEqualDate(
          '2019-05-04'
        );
        expect(parseFloat(currencyRates.atoNearestOrAverage.rate)).toBe(0.0003);
      });
    });
    describe('first of two missing [r] [❓] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-03'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-03'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to day before [✓r] [❓] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0002);
      });
      it('sets atoNearestOrLater to day before [✓r] [❓] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0002);
      });
      it('sets atoNearestOrAverage to day before [✓r] [❓] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0002);
      });
    });
    describe('second of two missing [r] [ ] [❓] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-04'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-04'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to day after [r] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0005);
      });
      it('sets atoNearestOrLater to day after [r] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0005);
      });
      it('sets atoNearestOrAverage to day after [r] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-05'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0005);
      });
    });
    describe('first of three missing [r] [❓] [ ] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-03'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-03'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to day before [✓r] [❓] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0002);
      });
      it('sets atoNearestOrLater to day before [✓r] [❓] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0002);
      });
      it('sets atoNearestOrAverage to day before [✓r] [❓] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0002);
      });
    });
    describe('second of three missing [r] [ ] [❓] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-04'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-04'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to two days before [✓r] [ ] [❓] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0002);
      });
      it('sets atoNearestOrLater to two days after [r] [ ] [❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0006);
      });
      it('sets atoNearestOrAverage to average of two days after and two days before [½r] [ ] [❓] [ ] [½r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrAverage.dates[1]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0004);
      });
    });
    describe('third of three missing [r] [ ] [ ] [❓] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-05'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-05'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to one day after [r] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0006);
      });
      it('sets atoNearestOrLater to one day after [r] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0006);
      });
      it('sets atoNearestOrAverage to one day after [r] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-06'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0006);
      });
    });
    describe('first of four missing [r] [❓] [ ] [ ] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-06'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-03'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-03'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to one day before [✓r] [❓] [ ] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0002);
      });
      it('sets atoNearestOrLater to one day before [✓r] [❓] [ ] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0002);
      });
      it('sets atoNearestOrAverage to one day before [✓r] [❓] [ ] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0002);
      });
    });
    describe('second of four missing [r] [ ] [❓] [ ] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-06'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-04'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-04'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to two days before [✓r] [ ] [❓] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0002);
      });
      it('sets atoNearestOrLater to two days before [✓r] [ ] [❓] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0002);
      });
      it('sets atoNearestOrAverage to two days before [✓r] [ ] [❓] [ ] [ ] [r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-02'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0002);
      });
    });
    describe('third of four missing [r] [ ] [ ] [❓] [ ] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-06'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-05'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-05'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to two days after [r] [ ] [ ] [❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0007);
      });
      it('sets atoNearestOrLater to two days after [r] [ ] [ ] [❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0007);
      });
      it('sets atoNearestOrAverage to two days after [r] [ ] [ ] [❓] [ ] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0007);
      });
    });
    describe('fourth of four missing [r] [ ] [ ] [ ] [❓] [r]', () => {
      let currencyRates;

      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-06'].currencies.CUR.ato = null;
        // Execute
        add(dayjs('2019-05-05'), 'CUR', dailyRates);
        // Get filled rates for date
        currencyRates = dailyRates.rates['2019-05-05'].currencies.CUR;
      });

      it('sets atoNearestOrEarlier to one day after [r] [ ] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
        expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0007);
      });
      it('sets atoNearestOrLater to one day after [r] [ ] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrLater).not.toBeNull();
        expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrLater.rate).toBe(0.0007);
      });
      it('sets atoNearestOrAverage to one day after [r] [ ] [ ] [ ] [❓] [✓r]', () => {
        expect(currencyRates.atoNearestOrAverage).not.toBeNull();
        expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
          '2019-05-07'
        );
        expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0007);
      });
    });
    describe('x of five missing', () => {
      beforeEach(() => {
        // Set missing dates
        dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-05'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-06'].currencies.CUR.ato = null;
        dailyRates.rates['2019-05-07'].currencies.CUR.ato = null;
      });
      describe('first of five missing [r] [❓] [ ] [ ] [ ] [ ] [r]', () => {
        it("throws Error as we don't expect > 4 days gap between available rates", () => {
          // Execute
          expect(() => {
            add(dayjs('2019-05-03'), 'CUR', dailyRates);
          }).toThrow();
        });
      });
      describe('second of five missing [r] [ ] [❓] [ ] [ ] [ ] [r]', () => {
        it("throws Error as we don't expect > 4 days gap between available rates", () => {
          // Execute
          expect(() => {
            add(dayjs('2019-05-04'), 'CUR', dailyRates);
          }).toThrow();
        });
      });
      describe('third of five missing [r] [ ] [ ] [❓] [ ] [ ] [r]', () => {
        it("throws Error as we don't expect > 4 days gap between available rates", () => {
          // Execute
          expect(() => {
            add(dayjs('2019-05-05'), 'CUR', dailyRates);
          }).toThrow();
        });
      });
      describe('fourth of five missing [r] [ ] [ ] [ ] [❓] [ ] [r]', () => {
        it("throws Error as we don't expect > 4 days gap between available rates", () => {
          // Execute
          expect(() => {
            add(dayjs('2019-05-06'), 'CUR', dailyRates);
          }).toThrow();
        });
      });
      describe('fifth of five missing [r] [ ] [ ] [ ] [ ] [❓] [r]', () => {
        it("throws Error as we don't expect > 4 days gap between available rates", () => {
          // Execute
          expect(() => {
            add(dayjs('2019-05-07'), 'CUR', dailyRates);
          }).toThrow();
        });
      });
    });
  });
  describe('currency not available for earlier month', () => {
    beforeEach(() => {
      dailyRates = {
        rates: {
          '2019-04-25': { currencies: {} },
          '2019-04-26': { currencies: {} },
          '2019-04-27': { currencies: {} },
          '2019-04-28': { currencies: {} },
          '2019-04-29': { currencies: {} },
          '2019-04-30': { currencies: {} },
          '2019-05-01': { currencies: { CUR: { ato: 0.0001 } } },
          '2019-05-02': { currencies: { CUR: { ato: 0.0002 } } },
          '2019-05-03': { currencies: { CUR: { ato: 0.0003 } } },
          '2019-05-04': { currencies: { CUR: { ato: 0.0004 } } },
          '2019-05-05': { currencies: { CUR: { ato: 0.0005 } } },
          '2019-05-06': { currencies: { CUR: { ato: 0.0006 } } }
        },
        firstDate: dayjs('25 April 2019'),
        lastDate: dayjs('6 May 2019')
      };
    });
    describe('dates in available month', () => {
      describe('first day only missing [x] | [❓] [r]', () => {
        let currencyRates;

        beforeEach(() => {
          // Set missing dates
          dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
          // Execute
          add(dayjs('2019-05-01'), 'CUR', dailyRates);
          // Get filled rates for date
          currencyRates = dailyRates.rates['2019-05-01'].currencies.CUR;
        });
        it('sets atoNearestOrEarlier to one day later [x] | [❓] [✓r]', () => {
          expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
          expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
            '2019-05-02'
          );
          expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0002);
        });
        it('sets atoNearestOrLater to one day later [x] | [❓] [✓r]', () => {
          expect(currencyRates.atoNearestOrLater).not.toBeNull();
          expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
            '2019-05-02'
          );
          expect(currencyRates.atoNearestOrLater.rate).toBe(0.0002);
        });
        it('sets atoNearestOrAverage to one day later [x] | [❓] [✓r]', () => {
          expect(currencyRates.atoNearestOrAverage).not.toBeNull();
          expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
            '2019-05-02'
          );
          expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0002);
        });
      });
      describe('first day of two missing [x] | [❓] [ ] [r]', () => {
        let currencyRates;

        beforeEach(() => {
          // Set missing dates
          dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
          dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
          // Execute
          add(dayjs('2019-05-01'), 'CUR', dailyRates);
          // Get filled rates for date
          currencyRates = dailyRates.rates['2019-05-01'].currencies.CUR;
        });
        it('sets atoNearestOrEarlier to two days later [x] | [❓] [ ] [✓r]', () => {
          expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
          expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
            '2019-05-03'
          );
          expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0003);
        });
        it('sets atoNearestOrLater to two days later [x] | [❓] [ ] [✓r]', () => {
          expect(currencyRates.atoNearestOrLater).not.toBeNull();
          expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
            '2019-05-03'
          );
          expect(currencyRates.atoNearestOrLater.rate).toBe(0.0003);
        });
        it('sets atoNearestOrAverage to two days later [x] | [❓] [ ] [✓r]', () => {
          expect(currencyRates.atoNearestOrAverage).not.toBeNull();
          expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
            '2019-05-03'
          );
          expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0003);
        });
      });
      describe('second day of four missing [x] | [ ] [❓] [ ] [ ] [r]', () => {
        let currencyRates;

        beforeEach(() => {
          // Set missing dates
          dailyRates.rates['2019-05-01'].currencies.CUR.ato = null;
          dailyRates.rates['2019-05-02'].currencies.CUR.ato = null;
          dailyRates.rates['2019-05-03'].currencies.CUR.ato = null;
          dailyRates.rates['2019-05-04'].currencies.CUR.ato = null;
          // Execute
          add(dayjs('2019-05-02'), 'CUR', dailyRates);
          // Get filled rates for date
          currencyRates = dailyRates.rates['2019-05-02'].currencies.CUR;
        });
        it('sets atoNearestOrEarlier to three days later [x] | [ ] [❓] [ ] [ ] [✓r]', () => {
          expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
          expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
            '2019-05-05'
          );
          expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0005);
        });
        it('sets atoNearestOrLater to three days later [x] | [ ] [❓] [ ] [ ] [✓r]', () => {
          expect(currencyRates.atoNearestOrLater).not.toBeNull();
          expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
            '2019-05-05'
          );
          expect(currencyRates.atoNearestOrLater.rate).toBe(0.0005);
        });
        it('sets atoNearestOrAverage to three days later [x] | [ ] [❓] [ ] [ ] [✓r]', () => {
          expect(currencyRates.atoNearestOrAverage).not.toBeNull();
          expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
            '2019-05-05'
          );
          expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0005);
        });
      });
    });
    describe('dates in unavailable month', () => {
      it('for last day in unavailable month, does not set atoNearestOrEarlier or atoNearestOrLater', () => {
        add(dayjs('2019-04-30'), 'CUR', dailyRates);
        const currencyRates = dailyRates.rates['2019-04-30'].currencies.CUR;
        expect(currencyRates).toBeUndefined();
      });
      it('for second to last day in unavailable month, does not set atoNearestOrEarlier or atoNearestOrLater', () => {
        add(dayjs('2019-04-29'), 'CUR', dailyRates);
        const currencyRates = dailyRates.rates['2019-04-29'].currencies.CUR;
        expect(currencyRates).toBeUndefined();
      });
      it('for fourth to last day in unavailable month, does not set atoNearestOrEarlier or atoNearestOrLater', () => {
        add(dayjs('2019-04-27'), 'CUR', dailyRates);
        const currencyRates = dailyRates.rates['2019-04-27'].currencies.CUR;
        expect(currencyRates).toBeUndefined();
      });
    });
  });
  describe('currency not available for later month', () => {
    beforeEach(() => {
      dailyRates = {
        rates: {
          '2019-04-25': { currencies: { CUR: { ato: 0.0025 } } },
          '2019-04-26': { currencies: { CUR: { ato: 0.0026 } } },
          '2019-04-27': { currencies: { CUR: { ato: 0.0027 } } },
          '2019-04-28': { currencies: { CUR: { ato: 0.0028 } } },
          '2019-04-29': { currencies: { CUR: { ato: 0.0029 } } },
          '2019-04-30': { currencies: { CUR: { ato: 0.003 } } },
          '2019-05-01': { currencies: {} },
          '2019-05-02': { currencies: {} },
          '2019-05-03': { currencies: {} },
          '2019-05-04': { currencies: {} },
          '2019-05-05': { currencies: {} },
          '2019-05-06': { currencies: {} }
        },
        firstDate: dayjs('25 April 2019'),
        lastDate: dayjs('6 May 2019')
      };
    });
    describe('dates in available month', () => {
      describe('last day only missing [r] [❓] | [x]', () => {
        let currencyRates;

        beforeEach(() => {
          // Set missing dates
          dailyRates.rates['2019-04-30'].currencies.CUR.ato = null;
          // Execute
          add(dayjs('2019-04-30'), 'CUR', dailyRates);
          // Get filled rates for date
          currencyRates = dailyRates.rates['2019-04-30'].currencies.CUR;
        });
        it('sets atoNearestOrEarlier to one day earlier [✓r] [❓] | [x]', () => {
          expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
          expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
            '2019-04-29'
          );
          expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0029);
        });
        it('sets atoNearestOrLater to one day earlier [✓r] [❓] | [x]', () => {
          expect(currencyRates.atoNearestOrLater).not.toBeNull();
          expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
            '2019-04-29'
          );
          expect(currencyRates.atoNearestOrLater.rate).toBe(0.0029);
        });
        it('sets atoNearestOrAverage to one day earlier [✓r] [❓] | [x]', () => {
          expect(currencyRates.atoNearestOrAverage).not.toBeNull();
          expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
            '2019-04-29'
          );
          expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0029);
        });
      });
      describe('last day of two missing [r] [ ] [❓] | [x]', () => {
        let currencyRates;

        beforeEach(() => {
          // Set missing dates
          dailyRates.rates['2019-04-29'].currencies.CUR.ato = null;
          dailyRates.rates['2019-04-30'].currencies.CUR.ato = null;
          // Execute
          add(dayjs('2019-04-30'), 'CUR', dailyRates);
          // Get filled rates for date
          currencyRates = dailyRates.rates['2019-04-30'].currencies.CUR;
        });

        it('sets atoNearestOrEarlier to two days earlier [✓r] [ ] [❓] | [x]', () => {
          expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
          expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
            '2019-04-28'
          );
          expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0028);
        });
        it('sets atoNearestOrLater to two days earlier [✓r] [ ] [❓] | [x]', () => {
          expect(currencyRates.atoNearestOrLater).not.toBeNull();
          expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
            '2019-04-28'
          );
          expect(currencyRates.atoNearestOrLater.rate).toBe(0.0028);
        });
        it('sets atoNearestOrAverage to two days earlier [✓r] [ ] [❓] | [x]', () => {
          expect(currencyRates.atoNearestOrAverage).not.toBeNull();
          expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
            '2019-04-28'
          );
          expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0028);
        });
      });
      describe('second to last day of four missing [r] [ ] [ ] [❓] [ ] | [x]', () => {
        let currencyRates;

        beforeEach(() => {
          // Set missing dates
          dailyRates.rates['2019-04-27'].currencies.CUR.ato = null;
          dailyRates.rates['2019-04-28'].currencies.CUR.ato = null;
          dailyRates.rates['2019-04-29'].currencies.CUR.ato = null;
          dailyRates.rates['2019-04-30'].currencies.CUR.ato = null;
          // Execute
          add(dayjs('2019-04-29'), 'CUR', dailyRates);
          // Get filled rates for date
          currencyRates = dailyRates.rates['2019-04-29'].currencies.CUR;
        });
        it('sets atoNearestOrEarlier to three days earlier [✓r] [ ] [ ] [❓] [ ] | [x]', () => {
          expect(currencyRates.atoNearestOrEarlier).not.toBeNull();
          expect(currencyRates.atoNearestOrEarlier.dates[0]).toEqualDate(
            '2019-04-26'
          );
          expect(currencyRates.atoNearestOrEarlier.rate).toBe(0.0026);
        });
        it('sets atoNearestOrLater to three days earlier [✓r] [ ] [ ] [❓] [ ] | [x]', () => {
          expect(currencyRates.atoNearestOrLater).not.toBeNull();
          expect(currencyRates.atoNearestOrLater.dates[0]).toEqualDate(
            '2019-04-26'
          );
          expect(currencyRates.atoNearestOrLater.rate).toBe(0.0026);
        });
        it('sets atoNearestOrAverage to three days earlier [✓r] [ ] [ ] [❓] [ ] | [x]', () => {
          expect(currencyRates.atoNearestOrAverage).not.toBeNull();
          expect(currencyRates.atoNearestOrAverage.dates[0]).toEqualDate(
            '2019-04-26'
          );
          expect(currencyRates.atoNearestOrAverage.rate).toBe(0.0026);
        });
      });
    });
    describe('dates in unavailable month', () => {
      it('for first day in unavailable month, does not set atoNearestOrEarlier or atoNearestOrLater', () => {
        add(dayjs('2019-05-01'), 'CUR', dailyRates);
        const currencyRates = dailyRates.rates['2019-05-01'].currencies.CUR;
        expect(currencyRates).toBeUndefined();
      });
      it('for second day in unavailable month, does not set atoNearestOrEarlier or atoNearestOrLater', () => {
        add(dayjs('2019-05-02'), 'CUR', dailyRates);
        const currencyRates = dailyRates.rates['2019-05-02'].currencies.CUR;
        expect(currencyRates).toBeUndefined();
      });
      it('for fourth day in unavailable month, does not set atoNearestOrEarlier or atoNearestOrLater', () => {
        add(dayjs('2019-05-04'), 'CUR', dailyRates);
        const currencyRates = dailyRates.rates['2019-05-04'].currencies.CUR;
        expect(currencyRates).toBeUndefined();
      });
    });
  });
});

expect.extend({
  toEqualDate(actual, expected) {
    const pass = dayjs(actual).isSame(dayjs(expected));
    if (pass) {
      return {
        message: () =>
          `expected ${dayjs(actual).format('YYYY-MM-DD')} to not equal ${dayjs(
            expected
          ).format('YYYY-MM-DD')}`,
        pass
      };
    } else {
      return {
        message: () =>
          `expected ${dayjs(actual).format('YYYY-MM-DD')} to equal ${dayjs(
            expected
          ).format('YYYY-MM-DD')}`,
        pass
      };
    }
  }
});
