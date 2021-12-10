import React from 'react'

const TradingVolume = ({ cryptoInfo }) => {
  const volumes = cryptoInfo.total_volumes.map(v => v[1])
  const maxVolume = Math.max(...volumes)
  const volumeWithDate = cryptoInfo.total_volumes.find(d => d[1] === maxVolume)
  const unixDate = new Date(volumeWithDate[0])
  const date = unixDate.toLocaleDateString('en-GB')

  return (
    <>
      <table className='infoTable'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Highest Trading Volume (€)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{date}</td>
            <td>{maxVolume}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TradingVolume