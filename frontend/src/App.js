import { Route } from "react-router"
import "./App.css"
import FindAuth from "./pages/FindAuth"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"

function App() {
  return (
    <>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/find-auth">
        <FindAuth />
      </Route>
      <Route path="/profile/edit" exact>
        <Profile />
      </Route>
      <Route path="/profile/:userId">
        <Profile />
      </Route>
    </>
  )
}

export default App
