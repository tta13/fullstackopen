const Filter = ({query, handleQueryChange}) => (
  <div>        
    search: <input value={query} onChange={handleQueryChange} />
  </div>
)

export default Filter;