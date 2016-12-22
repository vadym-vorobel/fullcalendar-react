import React, { PropTypes } from 'react';

/* eslint-disable import/no-unresolved */
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar-scheduler';
/* eslint-disable import/no-unresolved */

class FullCalendar extends React.Component {
  componentDidMount() {
    const { options, onDateChanged } = this.props;

    this.extendCalendarOptions = (calendarOptions) => {
      const defaultOptions = {
        viewRender(view) {
          const { intervalStart, intervalEnd } = view;

          const toDate = (momentDate) => momentDate.toDate();

          if (onDateChanged && typeof onDateChanged === 'function') {
            onDateChanged(toDate(intervalStart), toDate(intervalEnd));
          }
        },
      };

      return Object.assign({}, defaultOptions, calendarOptions);
    };

    this.calendar = $(this.refs['fullcalendar-container']);

    const calendarOptions = this.extendCalendarOptions(options);

    this.calendar.fullCalendar(calendarOptions);
  }

  componentWillReceiveProps(props) {
    const { options } = props;
    this.calendar.fullCalendar('refetchEvents');
    this.calendar.fullCalendar('changeView', options.defaultView);
    this.calendar.fullCalendar('gotoDate', options.defaultDate);
  }

  render() {
    return (
      <div ref="fullcalendar-container"></div>
    );
  }
}

FullCalendar.propTypes = {
  options: PropTypes.object,
  onDateChanged: PropTypes.func,
};

export {
  FullCalendar,
};
