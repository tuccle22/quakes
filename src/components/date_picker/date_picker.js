import React, { PureComponent } from 'react'
import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

import 'react-dates/lib/css/_datepicker.css'
import './date_picker.css'

class DatePicker extends PureComponent {
  state = { focused: false }

  onDateChange = date => {
    if (date) {
      this.props.getQuakesByTime(date)
    }
  }

  isOutsideRange = date => date.isAfter(moment())
  onFocusChange = focused => this.setState(focused)

  render() {
    const { date } = this.props
    const { focused } = this.state
    return (
      <SingleDatePicker
        block
        reopenPickerOnClearDate
        id='quake-date-picker'
        date={date}
        focused={focused}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
        isOutsideRange={this.isOutsideRange}
      />
    )
  }
}

DatePicker.propTypes = {

}

export default DatePicker
