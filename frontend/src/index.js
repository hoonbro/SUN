import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider, CalendarProvider } from "./context"

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <CalendarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CalendarProvider>
  </AuthProvider>,
  document.getElementById("root")
)
