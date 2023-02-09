const Contacts = ({people, query, onDelete}) => {
  const filterShownContacts = () => {
    const result = people.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    return result;
  }

  return (
    <ul>
      {filterShownContacts().map(person => {
          return (
            <li key={person.name}>
              {person.name} {person.number} <button onClick={() => onDelete(person)}>delete</button>
            </li>            
          )
        })
      }      
    </ul>
  )
}

export default Contacts;
