import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [city, setCity] = useState('Kathmandu');
  const [weatherData, setWeatherData] = useState(null);

  const APIKey = 'f19746072db592115285b20097110a25';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  const getData = () => {
    axios.get(url)
      .then(res => setWeatherData(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
    document.getElementById("weatherInput").focus();
    // eslint-disable-next-line
  }, [])

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = () => {
    getData();
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      getData();
    }
  };

  const name = weatherData ? weatherData.name : '';
  const country = weatherData ? weatherData.sys.country : '';
  const humidity = weatherData ? weatherData.main.humidity : '';
  const pressure = weatherData ? weatherData.main.pressure : '';
  const temp = weatherData ? weatherData.main.temp : '';
  const weather = weatherData ? weatherData.weather[0].description : '';
  const iconcode = weatherData ? weatherData.weather[0].icon : '#';

  const d = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return (
    <div className="App text-center">
      <div className="container" style={{maxWidth:"450px"}}>
        <h2>Weather App</h2>
        <div className="weather mb-3">
          <form>
            <div className='input-group'>
              <input
                id="weatherInput"
                type="text"
                className='form-control border'
                placeholder='City Name'
                onChange={handleChange}
                onKeyPress={handleKeypress} />
              <span className='btn bg-white border' onClick={handleSubmit}>Search</span>
            </div>
          </form>
        </div>

        <div className="card p-5 bg-light">
          <h1>{name}, {country}</h1>

          <h5 className='text-secondary'>{days[d.getDay()]}, {month[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</h5>

          <h1 style={{ fontSize: 54 }}>{Math.round(temp)}°C</h1>

          <img className='mx-auto' src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="Weather icon" />

          <h5 className='text-secondary text-capitalize'>{weather}</h5>

          <p>Humidity : {humidity}%</p>
          <p>Pressure : {pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default App;