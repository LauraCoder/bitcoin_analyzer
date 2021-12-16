<h1>Bitcoin Analyzer</h1>

<p>Bitcoin Analyzer is a simple React web app project to help to analyze the market value of bitcoin. It is created as a pre-assignment for the Rising Star programme of <a href="https://www.vincit.fi" target="_blank">Vincit</a>, and not to forget, to help Scrooge McDuck with investing. :detective:</p>
<p>For now, the app has three features:
  <ul>
    <li>
      Possibility to get the longest bearish trend in given date range.
    </li>
    <li>
      Possibility to get the highest trading volume in given date range.
    </li>
    <li>
      Possibility to see the best day to buy and sell bitcoin.
    </li>
  </ul>
  
 <h2>How to use it</h2>
 <ul>
    <li>
      Open the <a href="https://bitcoin-analyzer-lp.herokuapp.com/" target="_blank">live demo</a>.
    </li>
    <li>
      Choose the date range for which you want to see data.
    </li>
    <li>
      Choose from showed data which information you want to view.
    </li>
  </ul>
  
 <h2>Technologies used</h2>
 <ul>
    <li>
      Created with React
    </li>
    <li>
      Utilizes Axios for fetching data from <a href="https://www.coingecko.com/en/api/documentation" target="_blank">CoinGeko's public API</a>.
    </li>
    <li>
      <a href="https://reactdatepicker.com/" target="_blank">React Datepicker component</a> used for the date input
    </li>
    <li>
      Heroku for deploying the project.
    </li>
  </ul>
 <p>The goal was to create easy to use application with minimizing the use of external libraries and dependencies.</p>
 
 <h2>Future possibilities & What to improve</h2>
 <p>In the creation I focused on readable code, to which it would be easy to add more features in the future.</p>
 <p>The app works mainly smoothly and without any problems on desktop, tablet and mobile. However, occasionally fetching data throws an error which I haven't managed to fix yet. Therefore it is definitely something that still has to be worked with.</p>