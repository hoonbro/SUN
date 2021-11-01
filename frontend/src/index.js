import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import BottomNav from "./components/BottomNav"
import { AuthProvider } from "./context"

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <App />
      <BottomNav />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
)
