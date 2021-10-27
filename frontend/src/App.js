import { Redirect, Route, Switch } from "react-router"
import "./App.css"
import ResetPassword from "./pages/ResetPassword"
import FindAuth from "./pages/FindAuth"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import EditProfile from "./pages/EditProfile"
import ChangePassword from "./pages/ChangePassword"
import CalendarLayout from "./layouts/CalendarLayout"

function App() {
  const loggedIn = false
  return (
    <main className="h-full max-h-full pb-16">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/auth/find-auth">
          <FindAuth />
        </Route>
        <Route path="/auth/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/calendars">
          <CalendarLayout />
        </Route>
        <Route path="/profile/edit" exact>
          <EditProfile />
        </Route>
        <Route path="/profile/change-password" exact>
          <ChangePassword />
        </Route>
        <Route path="/profile/:email">
          <Profile />
        </Route>
        <Route path="*">
          {loggedIn ? <Redirect to="/calendars" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  )
}

export default App
