import { Switch, Route, useRouteMatch } from "react-router-dom"
import Calendar from "../pages/Calendar"
import CalendarCreate from "../pages/CalendarCreate"
import CalendarEdit from "../pages/CalendarEdit"
import CalendarSetting from "../pages/CalendarSetting"
import EventDetail from "../pages/EventDetail"

const CalendarLayout = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/setting`} exact>
        <CalendarSetting />
      </Route>
      <Route path={`${path}/create`}>
        <CalendarCreate />
      </Route>
      <Route path={`${path}/:calendarId`} exact>
        <Calendar />
      </Route>
      <Route path={`${path}/:calendarId/edit`}>
        <CalendarEdit />
      </Route>
      <Route path={`${path}/:calendarId/events/:eventId`}>
        <EventDetail />
      </Route>
    </Switch>
  )
}

export default CalendarLayout
