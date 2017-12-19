export const config = {
  class: {
    negative: 'red',
    positive: 'green',
    neutral: 'white'
  },
  interval: 15000,
  headers: [
  {
    id: 'name',
    html: 'Nazwa ',
    crypto: 'long'
  },
  {
    id: 'symbol',
    html: 'Symbol ',
    crypto: 'short'
  },
  {
    id: 'price',
    html: 'Cena ',
    crypto: 'price'
  },
  {
    id: 'cap',
    html: 'Kapitalizacja ',
    crypto: 'mktcap'
  },
  {
    id: 'volume',
    html: 'Wolumen (24h) ',
    crypto: 'usdVolume'
  },
  {
    id: 'change',
    html: 'Zmiana (24h) ',
    crypto: 'cap24hrChange'
  }]
}