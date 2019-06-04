# (WIP) easy-ato-fx-rates

## Disclaimer
The information, code, and its outputs from this repository are not providing any kind of general or individual advice.

I am not a tax or financial adviser, nor an expert in relevant laws. So please don't blindly trust this tool. I made it to help with my own taxes. You should consider seeking independent legal, financial, taxation or other advice, and an understanding of the code, to check if this tool is useful for you.

I'm not liable for any loss, legal or other trouble through using this repository. Please perform your own due dilligence :)

## Use case
### Background
Income earned in a foreign currency needs to be converted to AUD for inclusion in a tax return. The ATO provides daily, monthly and end of year foreign exchange rates for this purpose.

### Problem
The ATO's daily rates:
* Are not easy to navigate. They are separated by financial year and then by month.
* Do not include weekends and public holidays, even though foreign currency income can be earned on those days. As of 31 May 2019 as per [their website](https://www.ato.gov.au/Rates/Foreign-exchange-rates/?anchor=Dailyrates#Dailyrates), the ATO instructs `please either use any reasonable externally sourced exchange rate for that day, or, if none is available, the exchange rate provided in this document for the next closest day`. This significantly increases the time required to retrieve correct rates.

### Solution
Provide an interface for quickly and flexibly retrieving daily foreign exchange rates. Allow the user to select a preference for how weekends and public holidays are handled.

## Status


