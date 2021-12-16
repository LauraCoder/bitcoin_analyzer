import axios from 'axios'
const baseUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range'

const getAll = (fromDate, toDate) => {
  const request = axios.get(`${baseUrl}?vs_currency=eur&from=${fromDate}&to=${toDate}`)
  return request.then(response => response.data)
}

export default { getAll, }