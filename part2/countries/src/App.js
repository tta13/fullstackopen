import restcountries from "./services/restcountries";
import Filter from "./components/Filter";
import Country from "./components/Country";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    console.log('effect')
    restcountries
      .getAll()
      .then(data => {
        setCountries(data);
      })
  }, []);

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
    </div>
  );
}

export default App;
