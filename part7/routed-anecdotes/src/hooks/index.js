import { useState } from 'react'

export const useField = (type, initialValue=null) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}
