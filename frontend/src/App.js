import { useEffect, useState } from "react"
import { Switch } from "react-router"
import "./App.css"
import AppRoute from "./components/AppRoute"
import NoMatchRoute from "./components/NoMatchRoute"
import { useAuthDispatch, useAuthState } from "./context"
import { silentRefresh } from "./context/action"
import routes from "./routes"

function App() {
  const dispatch = useAuthDispatch()
  const auth = useAuthState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function asyncEffect() {
      await silentRefresh(dispatch, auth.token)
      setLoading(false)
    }
    asyncEffect()
  }, [])
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
    </main>
  )
}

export default App
