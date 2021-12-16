import React from 'react'
import './DateForm.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateForm = ({ show, setShow, setPage, startDate, setStartDate, endDate, setEndDate, setMessage }) => {
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

  return (
    <>
      <form onSubmit={submitDates} className='dateForm'>
        <div className='form-row'>
          <label htmlFor='startDatePicker'>Start Date</label>
          <DatePicker
            id='startDatePicker'
            placeholderText='Select Start Date'
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat='dd/MM/yyyy'
          />
        </div>
        <div className='form-row'>
          <label htmlFor='endDatePicker'>End Date</label>
          <DatePicker
            id='endDatePicker'
            placeholderText='Select End Date'
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            dateFormat='dd/MM/yyyy'
          />
        </div>
        <div className='form-row'>
          <button type='submit' className='btn'>{show ? 'Hide Data' : 'Show Data' }</button>
        </div>
      </form>
    </>
  )
}

export default DateForm