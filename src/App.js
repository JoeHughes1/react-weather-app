import { useEffect, useState } from 'react';
import './App.css';

function App() {

  //gets weather from API call
  const [data, setData] = useState(null);
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [currentCondition, setCurrentCondition] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [cityDisplay, setCityDisplay] = useState('--');
  const apiKey = '7737e0e70aa74192a86204542230309';


  const handleClick = async () => {
    try {
      const data = await( await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)).json()
      setData(data)

      setTemperature(data.current.temp_f);
      setCurrentCondition(data.current.condition);
      setHumidity(data.current.humidity);
      setCityDisplay(city.toUpperCase());

      console.log(temperature, currentCondition, humidity);
    } catch (err){
      console.error(err);
    }
  }



  return (
    <div className='weather__container'>
      <input className='city-input' required='required' placeholder='enter a city' value={city} onChange={e => setCity(e.target.value)} />
      <button type='submit' onClick={handleClick} >Search</button>

      <h1 className='weather__city'>{cityDisplay}</h1>
      <p className='stats weather__temp'>Temperature: {temperature ? temperature : '--'} F</p>
      <p className='stats weather__condition'>{currentCondition ? currentCondition.text : '--'}</p>
      <img src={currentCondition ? currentCondition.icon : null} className='condition-icon'></img>
      <p className='stats weather__humidity'>Humidity: {humidity ? humidity : '--'}</p>
    </div>
  );
}


export default App;

// http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}
