import React, { useState, useEffect } from 'react'
import axios from 'axios'

import DateInput from './components/DateInput'
import BearishTrend from './components/BearishTrend'
import TradingVolume from './components/TradingVolume'

const App = () => {
  const [ cryptoInfo, setCryptoInfo ] = useState([])
  const [ startDate, setStartDate ] = useState(null)
  const [ endDate, setEndDate ] = useState(null)
  const [ show, setShow ] = useState(false)

  useEffect(() => {
    if (startDate && endDate) {
      const startDateUnixTime = startDate.getTime() / 1000
      const endDateUnixTime = endDate.getTime() / 1000
      const over90Days = endDateUnixTime - startDateUnixTime > 7776000
      const fromDate = startDate.getTime() / 1000
      let toDate

      //if the chosen time range is longer than 90 days, 1 day will be added to ensure data from the last day
      //"Above 90 days from query time = daily data (00:00 UTC)"
      //if the chosen range is =< 90 days, 1h will be added
      //"1 - 90 days from query time = hourly data"
      if(over90Days) {
        toDate = endDate.getTime() / 1000 + 86400 //86400 = 1d
      } else {
        toDate= endDate.getTime() / 1000 + 3600 //3600 = 1h
      }
    
    const baseUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range'
    axios
      .get(`${baseUrl}?vs_currency=eur&from=${fromDate}&to=${toDate}`)
      .then(response => {
        console.log('promise fulfilled')
        setCryptoInfo(response.data)
      })
    }
  }, [endDate, startDate])

  const dailyPrice = () => {
    const priceArray = cryptoInfo.prices
    const startDateUnixTime = startDate.getTime() / 1000
    const endDateUnixTime = endDate.getTime() / 1000
    const over90Days = endDateUnixTime - startDateUnixTime > 7776000

    //Above 90 days from query time = daily data (00:00 UTC). 776000 = 1 day
    if(over90Days) {
      return priceArray
    }
    
    //1 - 90 days from query time = hourly data
    //For daily price need to get every 24th value from the array
    let newArr = [priceArray[0]]
    const filteredArray = priceArray.slice(1).filter((e, i=1) => i % 24 === 24 - 1);
    newArr.push(...filteredArray)

    return newArr
  }

  return (
    <>
      <h1>Bitcoin Analyzer</h1>
      <DateInput
        startDate={startDate} 
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        show={show}
        setShow={setShow} 
      />
      {show &&
        <>
          <BearishTrend dailyPrice={dailyPrice} />
          <TradingVolume cryptoInfo={cryptoInfo} />
        </>
      }
    </>
  )
}

export default App