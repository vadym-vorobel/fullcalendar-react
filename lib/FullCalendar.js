import React from 'react';
import T from 'prop-types';

/* eslint-disable import/no-unresolved */
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar-scheduler';
/* eslint-disable import/no-unresolved */

import { isOption } from './utils';

const store = {};

const toDate = (momentDate) => momentDate.toDate();

const equalWithStoreDate = (momentDate, storeKey) => momentDate.isSame(store[storeKey]);

const propTypes = {
  options: T.object,
  onDateChanged: T.func,
  getCalendarInstance: T.func,
};

const defaultProps = {
  options: {},
  onDateChanged: () => true,
  getCalendarInstance: () => true,
};

class FullCalendar extends React.Component {
  constructor(props) {
    super(props);

    // using new React ref syntax
    this.calendarRef = React.createRef();
  }

  componentDidMount() {
    const { options, onDateChanged, getCalendarInstance } = this.props;

    this.extendCalendarOptions = (calendarOptions) => {
      const defaultOptions = {
        viewRender(view) {
          const { intervalStart, intervalEnd } = view;

          if (onDateChanged && typeof onDateChanged === 'function') {
            if (!equalWithStoreDate(intervalStart, 'start') || !equalWithStoreDate(intervalEnd, 'end')) {
              store.start = toDate(intervalStart);
              store.end = toDate(intervalEnd);
              
              onDateChanged(store.start, store.end);
            }
          }
        },
      };

      return Object.assign({}, defaultOptions, calendarOptions);
    };

    this.calendar = $(this.calendarRef.current);

    const calendarOptions = this.extendCalendarOptions(options);

    this.calendar.fullCalendar(calendarOptions);

    // send 
    if (getCalendarInstance && typeof getCalendarInstance === 'function') {
      getCalendarInstance(this.calendar);
    }
  }

  componentWillReceiveProps(newProps) {
    const { options: newOptions } = newProps;
    const { options } = this.props;


    Object.keys(newOptions).forEach(optionName => {
      // update options dynamically
      if (isOption(optionName) && newOptions[optionName] !== options[optionName]) {
        this.calendar.fullCalendar('option', optionName, newOptions[optionName]);
      }
    });

    this.calendar.fullCalendar('refetchEvents');
  }

  render() {
    return (
      <div ref={this.calendarRef}></div>
    );
  }
}

FullCalendar.propTypes = propTypes;
FullCalendar.defaultProps = defaultProps;

export {
  FullCalendar,
};
