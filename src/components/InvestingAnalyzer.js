import React from 'react'

const InvestingAnalyzer = ({ dailyPrice, show }) => {
  if (!show) {
    return null
  }
  const priceArray = dailyPrice()
  const getPrices = priceArray.map(p => p[1])

  let maxProfit = 0
  let minPrice  = getPrices[0]
  let maxPrice, maxWithDate, minWithDate

  for (let i = 0; i < getPrices.length; i++) {
    minPrice = Math.min(getPrices[i], minPrice)
    maxProfit = Math.max(maxProfit, getPrices[i] - minPrice).toFixed(2)
    maxWithDate = priceArray.find(d => d[1] === getPrices[i])
    maxPrice = getPrices[i].toFixed(2)
  }

  minWithDate = priceArray.find(d => d[1] === minPrice)
  const minUnixDate = new Date(minWithDate[0])
  const minDate = minUnixDate.toLocaleDateString('en-GB')

  const maxUnixDate = new Date(maxWithDate[0])
  const maxDate = maxUnixDate.toLocaleDateString('en-GB')
  minPrice = minPrice.toFixed(2)

  return (
    <>
      <h2>Investing Analyzer</h2>
      <table className='dataTable'>
        <tbody>
          <tr>
            <th></th>
            <th>
              Date
            </th>
            <th>
              Price (€)
            </th>
          </tr>
          <tr>
            <th>
              Buy
            </th>
            <td>
              {minDate}
            </td>
            <td>
              {minPrice}
            </td>
          </tr>
          <tr>
            <th>
              Sell
            </th>
            <td>
              {maxDate}
            </td>
            <td>
              {maxPrice}
            </td>
          </tr>
          <tr>
            <th>Profit</th>
            <td colSpan={2}>{maxProfit}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default InvestingAnalyzer