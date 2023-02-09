import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import people from './services/people'

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
    people
      .get()
      .then(data => {
        setContacts(data)
      })
  }, [])  

  const addNewContact = (event) => {
    event.preventDefault()

    if(contacts.filter(value => value.name === newName).length !== 0) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    people
      .create({ name: newName, number: newPhoneNumber })
      .then(newContact => {
        setContacts(contacts.concat(newContact))
        setNewName('')
        setNewPhoneNumber('')
      })    
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
