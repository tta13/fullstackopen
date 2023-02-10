import restcountries from "./services/restcountries";
import Filter from "./components/Filter";
import Country from "./components/Country";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    console.log('effect')
    restcountries
      .getAll()
      .then(data => {
        setCountries(data);
      })
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  }

  const filterCountries = () => {
    const result = countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))
    return result;
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter query={query} handleQueryChange={handleQueryChange}/>
      <Country countries={filterCountries()} />
    </div>
  );
}

export default App;
