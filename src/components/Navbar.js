import React from 'react'
import './Navbar.css'

const Navbar = ({ page, setPage }) => {
  const handleBearishTrend = () => setPage('bearishTrend')
  const handleTradingVolume = () => setPage('tradingVolume')
  const handleAnalyzer = () => setPage('investmentAnalyzer')

  return (
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
  )
}

export default Navbar