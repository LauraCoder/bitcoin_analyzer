import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import BearishTrend from './BearishTrend'
import TradingVolume from './TradingVolume'
import InvestingAnalyzer from './InvestingAnalyzer'
import Notification from './Notification'

const DateInput = ({ startDate, endDate, setStartDate, setEndDate, dailyPrice, cryptoInfo  }) => {
  const [ page, setPage ] = useState('')
  const [ show, setShow ] = useState(false)
  const [ message, setMessage ] = useState('')
  const handleStartDateChange = (date) => setStartDate(new Date(date))
  const handleEndDateChange = (date) => setEndDate(new Date(date))

  const submitDates = (e) => {
    e.preventDefault()
    if (startDate === null || endDate === null) {
      setMessage('Please select the date range')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      return null
    }
    setShow(!show)
    setPage('bearishTrend')
  }

  const handleBearishTrend = () => setPage("bearishTrend")
  const handleTradingVolume = () => setPage("tradingVolume")
  const handleAnalyzer = () => setPage('investingAnalyzer')

  return (
    <>
      <div className='row'>
        <div className='column'>
          <Notification message={message} />
          <form onSubmit={submitDates} className='dateForm'>
            <div className='form-row'>
              <label>Start Date</label>
              <DatePicker
                placeholderText="Select Start Date"
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                value={startDate}
              /> 
            </div>
            <div className='form-row'>
              <label>End Date</label>
              <DatePicker
                placeholderText="Select End Date"
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className='form-row'>
              <button type='submit'>{show ? 'Hide Data' : 'Show Data' }</button>
            </div>
          </form>
        </div>
      </div>
      {show &&
        <>
          <ul className="nav">
            <li className={page === "bearishTrend" ? "active" : ""} onClick={handleBearishTrend}>
              Bearish Trend
            </li>
            <li className={page === "tradingVolume" ? "active" : ""} onClick={handleTradingVolume}>
              Trading Volume
            </li>
            <li className={page === "investingAnalyzer" ? "active" : ""} onClick={handleAnalyzer}>
              Investing Analyzer
            </li>
          </ul>
          <div className='row'>
            <div className='column'>
              <BearishTrend show={page === 'bearishTrend'} dailyPrice={dailyPrice} />
              <TradingVolume show={page === 'tradingVolume'} cryptoInfo={cryptoInfo} />
              <InvestingAnalyzer show={page === 'investingAnalyzer'} dailyPrice={dailyPrice} />
            </div>
          </div>
        </>
      }
    </>
  )
}

export default DateInput