import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

const api = {
  key: '9bc643087e9fe86bc950f4c8f9ec5902',
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
        }); 
       
    } 
  }


  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  // switch (weather.main) {
  //   case "Snow":
  //     document.getElementsByClassName(".app").style.backgroundImage =
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
  //     break;
  //   case "Clouds":
  //     document.getElementsByClassName(".app").style.backgroundImage =
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
  //     break;
  //   default:
  //     document.getElementsByClassName(".app").style.backgroundImage =
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
  //     break;
  // }



  return (
    <div className="app" id="wrapper-bg">
      <main>
        <div className="search-box">
          <input type="text"
            className="search"
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
            </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}
export default App;
