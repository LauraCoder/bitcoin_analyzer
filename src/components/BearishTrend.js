import React from 'react'

const BearishTrend = ({ dailyPrice, show }) => {
  if (!show) {
    return null
  }

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

  let bearishTrend = Math.max(...trendArray) + ' days'

  if (!trendArray.length) {
    bearishTrend = ('Prices did not decrease during the period.')
  }

  return (
    <div className='row'>
      <div className='column'>
        <h2>The Longest Bearish Trend</h2>
        <div className='colored-div'>
          <h3>{bearishTrend}</h3>
        </div>
      </div>
    </div>
  )
}

export default BearishTrend