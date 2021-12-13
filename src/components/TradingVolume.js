import React from 'react'

const TradingVolume = ({ cryptoInfo, show }) => {
  if (!show) {
    return null
  }

  const volumes = cryptoInfo.total_volumes.map(v => v[1])
  let maxVolume = Math.max(...volumes)
  const volumeWithDate = cryptoInfo.total_volumes.find(d => d[1] === maxVolume)
  const unixDate = new Date(volumeWithDate[0])
  const date = unixDate.toLocaleDateString('en-GB')
  maxVolume = maxVolume.toFixed(2)

  return (
    <div className='row'>
      <div className='column'>
        <h2>The Highest Trading Volume</h2>
        <table className='dataTable'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Volume (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{date}</td>
              <td>{maxVolume} €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TradingVolume