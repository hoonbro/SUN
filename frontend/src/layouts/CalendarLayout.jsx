import { Switch, Route, useRouteMatch } from "react-router-dom"
import Calendar from "../pages/Calendar"
import EventDetail from "../pages/EventDetail"

const CalendarLayout = () => {
  const { path } = useRouteMatch()
  return (
    <>
      <h1>CalendarLayout</h1>
      <Switch>
        <Route path={`${path}/:calendarId`} exact>
          <Calendar />
        </Route>
        <Route path={`${path}/:calendarId/events/:eventId`}>
          <EventDetail />
        </Route>
      </Switch>
    </>
  )
}

export default CalendarLayout
