import { Switch } from "react-router"
import "./App.css"
import AppRoute from "./components/AppRoute"
import NoMatchRoute from "./components/NoMatchRoute"
import routes from "./routes"

function App() {
  return (
    <main className="h-full max-h-full pb-16">
      <Switch>
        {routes.map(({ path, component, ...rest }) => (
          <AppRoute key={path} component={component} path={path} {...rest} />
        ))}
        <NoMatchRoute />
      </Switch>
    </main>
  )
}

export default App
