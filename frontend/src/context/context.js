import React, { useContext, createContext, useReducer } from "react"
import {
  AuthReducer,
  authInitialState,
  CalendarReducer,
  calendarInitialState,
  NotiReducer,
  notiInitialState,
} from "./reducer"

// Auth
const AuthStateContext = createContext(null)
const AuthDispatchContext = createContext(null)
// Calendar
const CalendarStateContext = createContext(null)
const CalendarDispatchContext = createContext(null)
// Noti
const NotiStateContext = createContext(null)
const NotiDispatchContext = createContext(null)

export const useNotiState = () => {
  const context = useContext(NotiStateContext)
  if (context === undefined) {
    throw new Error("useNotiState는 NotiProvider 안에서만 사용 가능합니다")
  }
  return context
}

export const useNotiDispatch = () => {
  const context = useContext(NotiDispatchContext)
  if (context === undefined) {
    throw new Error("useNotiDispatch는 NotiProvider 안에서만 사용 가능합니다")
  }
  return context
}

export const NotiProvider = ({ children }) => {
  const [noti, dispatch] = useReducer(NotiReducer, notiInitialState)

  return (
    <NotiStateContext.Provider value={noti}>
      <NotiDispatchContext.Provider value={dispatch}>
        {children}
      </NotiDispatchContext.Provider>
    </NotiStateContext.Provider>
  )
}

export const useAuthState = () => {
  const context = useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error("useAuthState는 AuthProvider 안에서만 사용 가능합니다")
  }
  return context
}

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error("useAuthDispatch는 AuthProvider 안에서만 사용 가능합니다")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, authInitialState)

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const useCalendarState = () => {
  const context = useContext(CalendarStateContext)
  if (context === undefined) {
    throw new Error(
      "useCalendarState는 CalendarProvider 안에서만 사용 가능합니다"
    )
  }
  return context
}

export const useCalendarDispatch = () => {
  const context = useContext(CalendarDispatchContext)
  if (context === undefined) {
    throw new Error(
      "useCalendarDispatch는 CalendarProvider 안에서만 사용 가능합니다"
    )
  }
  return context
}

export const CalendarProvider = ({ children }) => {
  const [calendar, dispatch] = useReducer(CalendarReducer, calendarInitialState)

  return (
    <CalendarStateContext.Provider value={calendar}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {children}
      </CalendarDispatchContext.Provider>
    </CalendarStateContext.Provider>
  )
}
