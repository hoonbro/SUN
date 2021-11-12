const { Route, Redirect } = require("react-router")
const { useAuthState, useCalendarState } = require("../context")

const NoMatchRoute = () => {
  const auth = useAuthState()
  const calendarState = useCalendarState()

  return (
    <Route path="*">
      {!!auth.token?.accessToken ? (
        <Redirect to={`/calendars/${calendarState.currentCalendarCode}`} />
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  )
}

export default NoMatchRoute
