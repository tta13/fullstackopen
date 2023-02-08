import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [contacts, setContacts] = useState([])
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setContacts(response.data)
      })
  }, [])  

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
