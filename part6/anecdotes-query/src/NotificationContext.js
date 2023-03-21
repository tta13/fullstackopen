import { createContext } from 'react'

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    case "CLEAR":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()

export default NotificationContext
