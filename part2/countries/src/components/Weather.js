const Weather = ({ weather }) => {
  if(!weather) return null;

  return (
    <div>
      <h2>Weather in {weather.city}</h2>
      <span>Time: {weather.time}</span>
      <span>Temperature: {weather.temperature}°C</span>
      <span>Wind: {weather.wind}m/s</span>
      <img 
          src={weather.iconSrc} 
          alt="Weather condition icon">
      </img>
    </div>
  )  
}

export default Weather;
