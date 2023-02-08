const Contacts = ({people, query}) => {
  const filterShownContacts = () => {
    const result = people.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    return result;
  }

  return (
    <ul>
      {filterShownContacts().map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

export default Contacts;
