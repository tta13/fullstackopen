import { useState } from 'react'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Filter from './components/Filter'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [query, setQuery] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  

  const addNewContact = (event) => {
    event.preventDefault()
    if(contacts.filter(value => value.name === newName).length !== 0) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    setContacts(contacts.concat({ name: newName, number: newPhoneNumber }))
    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter query={query} handleQueryChange={handleQueryChange}/>
      <ContactForm 
        onSubmit={addNewContact} 
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts people={contacts} query={query}/>
    </div>
  )
}

export default App
