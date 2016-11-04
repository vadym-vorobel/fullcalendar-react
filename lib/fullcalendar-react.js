import React, { PropTypes } from 'react';

/* eslint-disable import/no-unresolved */
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar-scheduler';
/* eslint-disable import/no-unresolved */

class FullCalendar extends React.Component {
  componentDidMount() {
    this.calendar = $(this.refs['fullcalendar-container']);

    this.calendar.fullCalendar(this.props.options);
  }

  componentWillReceiveProps(props) {
    this.calendar.fullCalendar(props.options);
  }

  render() {
    return (
      <div ref="fullcalendar-container"></div>
    );
  }
}

FullCalendar.propTypes = {
  options: PropTypes.object,
};

export {
  FullCalendar,
};
