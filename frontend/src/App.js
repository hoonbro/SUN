import { useEffect, useState } from "react"
import { Switch } from "react-router"
import "./App.css"
import AppRoute from "./components/AppRoute"
import NoMatchRoute from "./components/NoMatchRoute"
import {
  useAuthDispatch,
  useCalendarDispatch,
  getAllCalendar,
  silentRefresh,
  setCurrentCalendar,
} from "./context"
import BottomNav from "./components/BottomNav"
import routes from "./routes"

function App() {
  const authDispatch = useAuthDispatch()
  const calendarDispatch = useCalendarDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function asyncEffect() {
      const user = JSON.parse(localStorage.getItem("currentUser"))
      if (user) {
        // TODO: authState를 payload로 전달하지 않고 다른 방법으로 token을 전달하기
        await silentRefresh(authDispatch, user.token?.refreshToken)
        await getAllCalendar(calendarDispatch)
        setCurrentCalendar(calendarDispatch, user.user.defaultCalendar)
      }
      setLoading(false)
    }
    asyncEffect()
  }, [authDispatch, calendarDispatch])
  return (
    <main className="h-full max-h-full pb-16">
      {!loading && (
        <Switch>
          {routes.map(({ path, component, ...rest }) => (
            <AppRoute key={path} component={component} path={path} {...rest} />
          ))}
          <NoMatchRoute />
        </Switch>
      )}
      <BottomNav />
    </main>
  )
}

export default App
