import restcountries from "./services/restcountries";
import weather from "./services/weather";
import Filter from "./components/Filter";
import Country from "./components/Country";
import Weather from "./components/Weather";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    console.log('effect')
    restcountries
      .getAll()
      .then(data => {
        setCountries(data);
      })
  }, []);

  useEffect(() => {
    if(selectedCountries && selectedCountries.length === 1) {
      console.log('fetching weather');
      const capitalName = selectedCountries[0].capital[0];
      const [lat, lon] = selectedCountries[0].capitalInfo.latlng;
      weather
        .getWeather({ lat, lon })
        .then(data => {
          setCurrentWeather({ 
            city: capitalName,
            time: data.dt,
            temperature: data.main.temp,
            iconSrc: `${weather.iconsBaseUrl}/${data.weather[0].icon}@4x.png`,
            wind: data.wind.speed
          });
        })
        .catch(error => {
          if(error.response.status === 401)
            console.log('Unauthorized');
        });
    }
  }, [selectedCountries]);

  const handleQueryChange = (event) => {
    const q = event.target.value;
    setQuery(q);
    setSelectedCountries(countries.filter(c => c.name.common.toLowerCase().includes(q.toLowerCase())));
  }

  const selectCountry = (country) => {
    setSelectedCountries([country]);
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter query={query} handleQueryChange={handleQueryChange}/>
      <Country countries={selectedCountries} selectCountry={selectCountry}/>
      <Weather weather={currentWeather}/>
    </div>
  );
}

export default App;
