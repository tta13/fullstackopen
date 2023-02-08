const ContactForm = ({onSubmit, newName, handleNameChange, newPhoneNumber, handlePhoneNumberChange}) => {
  return ( 
    <form onSubmit={onSubmit}>
      <h2>Add a new contact</h2>
      <div>
      name: <input 
      value={newName}
      onChange={handleNameChange} />
      </div>
      <div>
      number: <input 
        value={newPhoneNumber}
        onChange={handlePhoneNumberChange}
      />
      </div>
      <div>
      <button type="submit">add</button>
      </div>
    </form>
  )
}

export default ContactForm;
