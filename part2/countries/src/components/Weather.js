const Weather = ({ weather }) => {
  if(!weather) return null;

  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'column'
      }
    }>
      <h2>Weather in {weather.city}</h2>
      <span>Local time: {weather.time}</span>
      <span>Temperature: {weather.temperature}°C</span>
      <span>Wind: {weather.wind}m/s</span>
      <img 
          src={weather.iconSrc} 
          alt="Weather condition icon"
          width={'200px'}>
      </img>
    </div>
  )  
}

export default Weather;
