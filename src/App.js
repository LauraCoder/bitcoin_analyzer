import React, { useState, useEffect } from 'react'

import dataService from './services/bitcoinData'
import DateForm from './components/DateForm'
import Notification from './components/Notification'
import BearishTrend from './components/BearishTrend'
import TradingVolume from './components/TradingVolume'
import InvestmentAnalyzer from './components/InvestmentAnalyzer'
import Navbar from './components/Navbar'

const App = () => {
  const [ cryptoInfo, setCryptoInfo ] = useState([])
  const [ startDate, setStartDate ] = useState(null)
  const [ endDate, setEndDate ] = useState(null)
  const [ message, setMessage ] = useState('')
  const [ show, setShow ] = useState(false)
  const [ page, setPage ] = useState('')

  const ninetyDaysUnix = 7776000
  const oneDayUnix = 86400
  const oneHourUnix = 3600
  let endDateUnixTime, toDate, fromDate, diffStartDateEndDate

  if ( startDate && endDate ) {
    endDateUnixTime = endDate.getTime() / 1000
    fromDate = startDate.getTime() / 1000
    diffStartDateEndDate = endDateUnixTime - fromDate
  }

  useEffect(() => {
    if ( startDate && endDate ) {
      //"Above 90 days from query time = daily data (00:00 UTC)"
      //"1 - 90 days from query time = hourly data"
      if( diffStartDateEndDate > ninetyDaysUnix ) {
        toDate = endDate.getTime() / 1000 + oneDayUnix
      } else {
        toDate= endDate.getTime() / 1000 + oneHourUnix
      }

      dataService
        .getAll(fromDate, toDate)
        .then(initialData => {
          setCryptoInfo(initialData)
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          setMessage(
            'Something went wrong'
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }, [endDate, startDate])

  const dailyPrice = () => {
    const dailyPriceArray = cryptoInfo.prices

    //Above 90 days from query time = daily data (00:00 UTC)
    if( diffStartDateEndDate > ninetyDaysUnix ) {
      return dailyPriceArray
    }

    //1 - 90 days from query time = hourly data
    let newArr = [dailyPriceArray[0]]
    const filteredArray = dailyPriceArray.slice(1).filter((i=1) => i % 24 === 24 - 1)
    newArr.push(...filteredArray)

    return newArr
  }

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
          <Navbar
            page={page}
            setPage={setPage}
          />
          <div className='row'>
            <div className='column'>
              <BearishTrend
                show={page === 'bearishTrend'}
                dailyPrice={dailyPrice}
              />
              <TradingVolume
                show={page === 'tradingVolume'}
                cryptoInfo={cryptoInfo}
              />
              <InvestmentAnalyzer
                show={page === 'investmentAnalyzer'}
                dailyPrice={dailyPrice}
              />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default App