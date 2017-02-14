# jss:fullcalendar-react

Provide a FullCalendar ReactJS component. Also, available scheduler functionality.

### More about core packages:
* fullcalendar - https://fullcalendar.io/
* fullcalendar-scheduler - https://fullcalendar.io/scheduler/

### Example
```js
import React from 'react';

import { FullCalendar } from 'meteor/jss:fullcalendar-react';

const calendarOptions = {
    id: 'calendar-example',
    defaultView: 'agendaDay',
    defaultDate: new Date(),
    editable: true,
    droppable: true,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    
    slotDuration: '00:15',
    scrollTime: '08:00',
    columnFormat: 'ddd DD/MM',
    displayTime: true,
    firstDay: 1,
    
    // also can be array or json feed
    events() {
        // should return an array of events
    },
};

const onDateChanged = (startDate, endDate) => {
    // make some actions with new dates
};
 
export const CalendarExample = () => {
    <FullCalendar
        options={calendarOptions}
        onDateChanged={onDateChanged}
    />;
};

```

### Dependencies

* fullcalendar - https://www.npmjs.com/package/fullcalendar
* fullcalendar-scheduler - https://www.npmjs.com/package/fullcalendar-scheduler

##### Peer dependencies

* react
* react-dom
