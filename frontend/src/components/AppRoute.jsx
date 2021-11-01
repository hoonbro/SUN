import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useAuthState } from "../context"

const AppRoute = ({ component: Component, path, ...rest }) => {
  const { requiresAuth, requiresNoAuth, ...routeRest } = rest
  const auth = useAuthState()

  return (
    <Route
      exact
      key={path}
      path={path}
      render={(props) =>
        rest.requiresAuth && !auth.token?.accessToken ? (
          <Redirect to={{ pathname: "/" }} />
        ) : rest.requiresNoAuth && !!auth.token?.accessToken ? (
          <Redirect to={{ pathname: `/calendars/1` }} />
        ) : (
          <Component {...props} />
        )
      }
      {...routeRest}
    />
  )
}

export default AppRoute
