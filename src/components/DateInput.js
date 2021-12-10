import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateInput = ({ startDate, endDate, setStartDate, setEndDate, show, setShow,  }) => {
  const handleStartDateChange = (date) => setStartDate(new Date(date))
  const handleEndDateChange = (date) => setEndDate(new Date(date))
  const submitDates = (e) => e.preventDefault()
  
  return (
    <>
      <form onSubmit={submitDates}>
        <table>
          <tbody>
            <tr>
              <td>
                <DatePicker
                  placeholderText="Select Start Date"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                />
              </td>
              <td>
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
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit' onClick={() => setShow(!show)}>Show Data</button>
      </form>
    </>
  )
}

export default DateInput