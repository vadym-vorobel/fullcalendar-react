# jss:fullcalendar-react

**MeteorJS package.**

Provide a FullCalendar ReactJS component. Also, available scheduler functionality.

### More about core packages:
* fullcalendar - https://fullcalendar.io/
* fullcalendar-scheduler - https://fullcalendar.io/scheduler/

### Example
Visit the [examples repository](https://github.com/vadym-vorobel/fullcalendar-react-examples)

### Dependencies

* fullcalendar - https://www.npmjs.com/package/fullcalendar
* fullcalendar-scheduler - https://www.npmjs.com/package/fullcalendar-scheduler

##### Peer dependencies

* react
* react-dom
* prop-types

## Deprecation warning

In the version v1.0.0 full calendar options `defaultDate` and `defaultView` will not be reactive because this leads to redundant calendar re-rendering. Please, use `getCalendarInstance` prop with fullcalendar methods `gotoDate` and `changeView` instead ([see the example for more details](https://github.com/vadym-vorobel/fullcalendar-react-examples/blob/master/client/components/calendar-examples/DynamicDateCalendar.js)).