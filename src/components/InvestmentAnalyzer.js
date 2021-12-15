import React from 'react'
import './../dataTable.css'

const InvestmentAnalyzer = ({ dailyPrice, show }) => {
  if (!show) {
    return null
  }
  const dailyPriceArray = dailyPrice()
  const pricesOnly = dailyPriceArray.map(p => p[1])

  let maxProfit = 0
  let minPrice  = pricesOnly[0]
  let maxPrice, maxPriceWithDate, minPriceWithDate

  for (let i = 0; i < pricesOnly.length; i++) {
    minPrice = Math.min(pricesOnly[i], minPrice)
    maxProfit = Math.max(maxProfit, pricesOnly[i] - minPrice).toFixed(2)
    maxPriceWithDate = dailyPriceArray.find(d => d[1] === pricesOnly[i])
    maxPrice = pricesOnly[i].toFixed(2)
  }

  minPriceWithDate = dailyPriceArray.find(d => d[1] === minPrice)
  const minUnixDate = new Date(minPriceWithDate[0])
  const minDate = minUnixDate.toLocaleDateString('en-GB')
  minPrice = minPrice.toFixed(2)

  const maxUnixDate = new Date(maxPriceWithDate[0])
  const maxDate = maxUnixDate.toLocaleDateString('en-GB')

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
              Price
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
              {minPrice} €
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
              {maxPrice} €
            </td>
          </tr>
          <tr>
            <th>
              Profit
            </th>
            <td colSpan={2}>
              {maxProfit} €
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default InvestmentAnalyzer