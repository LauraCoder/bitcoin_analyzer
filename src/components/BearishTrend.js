import React from 'react'
import './dataTable.css'

const BearishTrend = ({ dailyPrice, show }) => {
  if (!show || !dailyPrice) {
    return null
  }

  const pricesOnly = dailyPrice().map(p => p[1])
  let trendArray = []
  let trendLength = 0

  for (let i = 0; i < pricesOnly.length; i++) {
    if(pricesOnly[i] > pricesOnly[i+1]) {
      trendLength++
    } else if(pricesOnly[i] <= pricesOnly[i+1] && trendLength > 0) {
      trendArray.push(trendLength)
      trendLength = 0
    }
  }
  let bearishTrend = Math.max(...trendArray)
  let daysText = 'days'

  if (!trendArray.length) {
    bearishTrend = ('Prices did not decrease during the period.')
    daysText = ''
  } else if (bearishTrend === 1) {
    daysText = 'day'
  }

  return (
    <>
      <h2>The Longest Bearish Trend</h2>
      <div className='coloredDiv'>
        <h4>{bearishTrend} {daysText}</h4>
      </div>
    </>
  )
}

export default BearishTrend