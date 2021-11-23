import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider, CalendarProvider, NotiProvider } from "./context"

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <CalendarProvider>
      <NotiProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotiProvider>
    </CalendarProvider>
  </AuthProvider>,
  document.getElementById("root")
)
