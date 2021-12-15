import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import DateForm from './components/DateForm'
import Notification from './components/Notification'
import BearishTrend from './components/BearishTrend'
import TradingVolume from './components/TradingVolume'
import InvestmentAnalyzer from './components/InvestmentAnalyzer'

const App = () => {
  const [ cryptoInfo, setCryptoInfo ] = useState([])
  const [ startDate, setStartDate ] = useState(null)
  const [ endDate, setEndDate ] = useState(null)
  const [ message, setMessage ] = useState('')
  const [ show, setShow ] = useState(false)
  const [ page, setPage ] = useState('')

  useEffect(() => {
    if ( startDate && endDate ) {
      const startDateUnixTime = startDate.getTime() / 1000
      const endDateUnixTime = endDate.getTime() / 1000
      const diffStartDateEndDate = endDateUnixTime - startDateUnixTime
      const ninetyDays = 7776000
      const fromDate = startDate.getTime() / 1000
      const oneDay = 86400
      const oneHour = 3600
      let toDate

      //"Above 90 days from query time = daily data (00:00 UTC)"
      //"1 - 90 days from query time = hourly data"
      if( diffStartDateEndDate > ninetyDays ) {
        toDate = endDate.getTime() / 1000 + oneDay
      } else {
        toDate= endDate.getTime() / 1000 + oneHour
      }

      console.log('effect')
      const baseUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range'
      axios
        .get(`${baseUrl}?vs_currency=eur&from=${fromDate}&to=${toDate}`)
        .then(response => {
          console.log('promise fulfilled')
          setCryptoInfo(response.data)
        })
    } else {
      return setCryptoInfo([])
    }
  }, [endDate, startDate])

  const dailyPrice = () => {
    const dailyPriceArray = cryptoInfo.prices
    const startDateUnixTime = startDate.getTime() / 1000
    const endDateUnixTime = endDate.getTime() / 1000
    const diffStartDateEndDate = endDateUnixTime - startDateUnixTime
    const ninetyDays = 7776000

    //Above 90 days from query time = daily data (00:00 UTC)
    if( diffStartDateEndDate > ninetyDays ) {
      return dailyPriceArray
    }

    //1 - 90 days from query time = hourly data
    let newArr = [dailyPriceArray[0]]
    const filteredArray = dailyPriceArray.slice(1).filter((e, i=1) => i % 24 === 24 - 1)
    newArr.push(...filteredArray)

    return newArr
  }

  const handleBearishTrend = () => setPage('bearishTrend')
  const handleTradingVolume = () => setPage('tradingVolume')
  const handleAnalyzer = () => setPage('investmentAnalyzer')

  return (
    <div className='container'>
      <Notification message={message} />
      <div className='row'>
        <div className='column'>
          <h1>Bitcoin Analyzer</h1>
        </div>
      </div>
      <div className='row'>
        <div className='column'>
          <DateForm
            show={show}
            setShow={setShow}
            setPage={setPage}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setMessage={setMessage}
          />
        </div>
      </div>
      {show &&
        <div className='dataColumn'>
          <ul className='nav'>
            <li className={page === 'bearishTrend' ? 'active' : ''} onClick={handleBearishTrend}>
              Bearish Trend
            </li>
            <li className={page === 'tradingVolume' ? 'active' : ''} onClick={handleTradingVolume}>
              Trading Volume
            </li>
            <li className={page === 'investmentAnalyzer' ? 'active' : ''} onClick={handleAnalyzer}>
              Investing Analyzer
            </li>
          </ul>
          <div className='row'>
            <div className='column'>
              <BearishTrend show={page === 'bearishTrend'} dailyPrice={dailyPrice} />
              <TradingVolume show={page === 'tradingVolume'} cryptoInfo={cryptoInfo} />
              <InvestmentAnalyzer show={page === 'investmentAnalyzer'} dailyPrice={dailyPrice} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default App