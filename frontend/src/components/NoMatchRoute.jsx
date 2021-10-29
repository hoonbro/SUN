const { Route, Redirect } = require("react-router")
const { useAuthState } = require("../context")

const NoMatchRoute = () => {
  const auth = useAuthState()
  return (
    <Route path="*">
      {!!auth.token?.accessToken ? (
        <Redirect to="/calendars/1" />
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  )
}

export default NoMatchRoute
