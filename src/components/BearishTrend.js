import React from 'react'

const BearishTrend = ({ dailyPrice }) => {
  const priceArray = dailyPrice().map(p => p[1])
  let trendArray = []
  let trendLength = 0
  
  for (let i = 0; i < priceArray.length; i++) {
    if(priceArray[i] > priceArray[i+1]) {
      trendLength++
    } else if(priceArray[i] <= priceArray[i+1]) {
      if (trendLength > 0){
        trendArray.push(trendLength) 
      }
      trendLength = 0
    }
  }
  
  const bearishTrend = Math.max(...trendArray)
  
  if (!trendArray.length) {
    return ('Prices did not decrease during the period.')
  }
  
  return (
    <>
      <table className='infoTable'>
        <thead>
          <tr>
            <th>The Longest Bearish Trend</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{bearishTrend} days</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default BearishTrend