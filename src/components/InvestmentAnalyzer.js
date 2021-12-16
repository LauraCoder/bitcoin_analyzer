import React from 'react'
import './dataTable.css'

const DataTable = ({ getMinDate, getMaxDate, roundedMinPrice, roundedMaxPrice, maxProfit }) => {
  return (
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
            {getMinDate()}
          </td>
          <td>
            {roundedMinPrice} €
          </td>
        </tr>
        <tr>
          <th>
            Sell
          </th>
          <td>
            {getMaxDate()}
          </td>
          <td>
            {roundedMaxPrice} €
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
  )
}

const InvestmentAnalyzer = ({ dailyPrice, show }) => {
  if (!show || !dailyPrice) {
    return null
  }
  const dailyPriceArray = dailyPrice()
  let pricesOnly = dailyPriceArray.map(p => p[1])
  let maxProfit, minPrice, maxPrice, roundedMinPrice, roundedMaxPrice

  if ( pricesOnly.length > 1 ) {
    let minPriceIndex = 0
    let maxPriceIndex = 1
    let currentMinPriceIndex = 0

    for(let i = 1; i < pricesOnly.length; i++) {
      if(pricesOnly[i] < pricesOnly[currentMinPriceIndex]) {
        currentMinPriceIndex = i
      }
      if(pricesOnly[maxPriceIndex] - pricesOnly[minPriceIndex] < pricesOnly[i] - pricesOnly[currentMinPriceIndex]) {
        maxPriceIndex = i
        minPriceIndex = currentMinPriceIndex
      }
    }

    minPrice = pricesOnly[minPriceIndex]
    maxPrice = pricesOnly[maxPriceIndex]
    maxProfit = (maxPrice-minPrice).toFixed(2)
    roundedMinPrice = minPrice.toFixed(2)
    roundedMaxPrice = maxPrice.toFixed(2)
  }

  const getMinDate = () => {
    const minPriceWithDate = dailyPriceArray.find(d => d[1] === minPrice)
    const minUnixDate = new Date(minPriceWithDate[0])
    const minDate = minUnixDate.toLocaleDateString('en-GB')
    return minDate
  }

  const getMaxDate = () => {
    const maxPriceWithDate = dailyPriceArray.find(d => d[1] === maxPrice)
    const maxUnixDate = new Date(maxPriceWithDate[0])
    const maxDate = maxUnixDate.toLocaleDateString('en-GB')
    return maxDate
  }

  return (
    <>
      <h2>Investing Analyzer</h2>
      {pricesOnly.length < 2 || maxProfit <= 0 ?
        <div className='coloredDiv'>
          <h4>No possibility for profit during the period</h4>
        </div>
        :
        <DataTable
          getMinDate={getMinDate}
          getMaxDate={getMaxDate}
          roundedMinPrice={roundedMinPrice}
          roundedMaxPrice={roundedMaxPrice}
          maxProfit={maxProfit}
        />
      }
    </>
  )
}

export default InvestmentAnalyzer