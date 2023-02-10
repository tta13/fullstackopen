const Country = ({ countries, selectCountry }) => {
  if(!countries || countries.length === 0) {
    return (
      <div>No matches, specify another filter.</div>
    )
  }
  else if(countries.length > 10) {
    return (
      <div>Too many matches, specify another filter.</div>
    )
  }
  else if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(country => {        
          return (          
            <p key={country.fifa}>
              {country.name.common}
              <button onClick={() => selectCountry(country)}>show</button>
            </p>
          )          
        })}
      </div>
    )
  }

  const country = countries[0];
  console.log(country);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Land area: {country.area.toLocaleString('en-US')}km²</div>
      <div>Population: {country.population.toLocaleString('en-US')}</div>
      <b>Languages</b>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <figure>
        <img 
          src={country.flags.png} 
          alt={'alt' in country.flags ? country.flags.alt : ''}>
        </img>
      </figure>
    </div>
  )
}

export default Country;
