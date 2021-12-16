import React from 'react'
import './dataTable.css'

const DataTable = ({ volumeDate, maxVolume }) => {
  return (
    <table className='dataTable'>
      <thead>
        <tr>
          <th>
            Date
          </th>
          <th>
            Volume
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {volumeDate}
          </td>
          <td>
            {maxVolume} €
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const TradingVolume = ({ cryptoInfo, show }) => {
  if (!show) {
    return null
  }

  const volumes = cryptoInfo.total_volumes.map(v => v[1])
  let maxVolume = Math.max(...volumes)
  const volumeWithDate = cryptoInfo.total_volumes.find(d => d[1] === maxVolume)
  const volumeUnixDate = new Date(volumeWithDate[0])
  const volumeDate = volumeUnixDate.toLocaleDateString('en-GB')
  maxVolume = maxVolume.toFixed(2)

  return (
    <>
      <h2>The Highest Trading Volume</h2>
      <DataTable
        volumeDate={volumeDate}
        maxVolume={maxVolume}
      />
    </>
  )
}

export default TradingVolume