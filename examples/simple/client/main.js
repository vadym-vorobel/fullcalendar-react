import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { FullCalendar } from 'meteor/jss:fullcalendar-react';

class FullcalendarTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          title: 'Default event',
          start: new Date(),
          // plus 30 minutes
          end: new Date(Date.now + 30 * 60 * 1000),
        }
      ],
    };

    this.onEventSelect = this.onEventSelect.bind(this);
  }

  onEventSelect(start, end) {
    const events = this.state.events;

    const newEventsSource = events.concat({
      title: `Event #${events.length}`,
      // moment object to simple date object
      start: start.toDate(),
      end: end.toDate(),
    });

    this.setState({
      events: newEventsSource,
    });
  }

  render() {
    const calendarOptions = {
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

      header: false,

      id: 'calendar-example',
      defaultView: 'agendaDay',
      defaultDate: new Date(),
      timezone: 'local',

      editable: true,
      droppable: true,
      selectable: true,

      slotDuration: '00:15',
      scrollTime: '08:00',
      columnFormat: 'ddd DD/MM',
      displayTime: true,
      firstDay: 1,

      select: this.onEventSelect,

      // please, use funciton events source for reactivity support
      events: (start, end, timezone, callback) => {
        callback(this.state.events);
      },
    }

    return(
      <div className="row">
        <div className="calendar">
            <FullCalendar options={calendarOptions} />
        </div>
      </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<FullcalendarTest />, document.getElementById('render-target'))
});
