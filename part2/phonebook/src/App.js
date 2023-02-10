import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Notification from './components/Notification'
import people from './services/people'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState(null)


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
      .getContact()
      .then(data => {
        setContacts(data)
      })
  }, [])  

  const addNewContact = (event) => {
    event.preventDefault()

    const existingContacts = contacts.filter(value => value.name === newName);

    if(existingContacts.length !== 0) {
      if(window.confirm(`${newName} is already in the phonebook. Replace the old number with this new one?`)) {
        people
          .updateContact({...existingContacts[0], number: newPhoneNumber})
          .then(newContact => {
            setContacts(contacts.map(c => c.id !== existingContacts[0].id ? c : newContact))
            setNewName('')
            setNewPhoneNumber('')
            setMessage({ text: `Updated contact: ${newContact.name}`, type: 'success' })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      }
      
    } else {
      people
        .createContact({ name: newName, number: newPhoneNumber })
        .then(newContact => {
          setContacts(contacts.concat(newContact))
          setNewName('')
          setNewPhoneNumber('')
          setMessage({ text: `Added contact: ${newContact.name}`, type: 'success' })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })   
    }
  }

  const deleteContact = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      people
        .deleteContact(person.id)
        .then(response => {
          setContacts(contacts.filter(c => c.id !== person.id))
          setMessage({ text: `Deleted contact: ${person.name}`, type: 'success' })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        });
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <Filter query={query} handleQueryChange={handleQueryChange}/>
      <ContactForm 
        onSubmit={addNewContact} 
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts 
        people={contacts} 
        query={query}
        onDelete={deleteContact}
      />
    </div>
  )
}

export default App
