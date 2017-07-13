import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { FullCalendar } from 'meteor/jss:fullcalendar-react';

const generateRandomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));


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

      date: new Date(),
    };

    this.onEventSelect = this.onEventSelect.bind(this);
    this.goToSomeDate = this.goToSomeDate.bind(this);
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

  goToSomeDate() {
    this.setState({ date: generateRandomDate(new Date(2000, 0, 1), new Date()) });
  }

  render() {
    const calendarOptions = {
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

      header: false,

      id: 'calendar-example',
      defaultView: 'agendaDay',
      defaultDate: this.state.date,
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
          <button onClick={this.goToSomeDate}>Go To Date</button>

          <FullCalendar options={calendarOptions} />
        </div>
      </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<FullcalendarTest />, document.getElementById('render-target'))
});
