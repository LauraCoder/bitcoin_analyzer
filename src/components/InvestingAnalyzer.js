import React from 'react'

//Still needs fixing
const InvestingAnalyzer = ({ dailyPrice, show }) => {
  if (!show) {
    return null
  }
  const dailyPriceArray = dailyPrice()
  const getPrices = dailyPriceArray.map(p => p[1])
      
  //lowest price
  let minPrice = Math.min(...getPrices)
  const withDate = dailyPriceArray.find(d => d[1] === minPrice)
  const unixDate = new Date(withDate[0])
  const date = unixDate.toLocaleDateString('en-GB')
     
  //highest price after the lowest
  const restOfArray = getPrices.slice(getPrices.indexOf(minPrice))
  const maxPrice = Math.max(...restOfArray).toFixed(2)
  
  let maxProfit = 0
  let maxWithDate
      
  for (let i = 0; i < restOfArray.length; i++) {
    //lowestPrice = Math.min(restOfArray[i], lowestPrice)
    maxProfit = Math.max(maxProfit, restOfArray[i] - minPrice).toFixed(2)
    maxWithDate = dailyPriceArray.find(d => d[1] === restOfArray[i])
  }
      
  const maxUnixDate = new Date(maxWithDate[0])
  const maxDate = maxUnixDate.toLocaleDateString('en-GB')
  minPrice = minPrice.toFixed(2)
      
  return (
    <div className='row'>
      <div className='column'>
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
                {date}
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
      </div>
    </div>
  )
}

export default InvestingAnalyzer