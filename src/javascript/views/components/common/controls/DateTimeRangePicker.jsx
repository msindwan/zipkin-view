/**
 * Copyright 2017 Mayank Sindwani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * DateTimeRangePicker
 *
 * @Date : 2017-12-07
 * @Description : DateTimeRangePicker Control.
 **/

import { injectIntl, FormattedMessage } from 'react-intl';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import Moment from 'moment';
import React from 'react';

class DateTimeRangePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputStartTimeMinute: '00',
            inputEndTimeMinute: '00',
            inputStartTimeHour: '00',
            inputEndTimeHour: '00',
            inputFrom: undefined,
            inputTo: undefined,
            startTimeMinute: '',
            endTimeMinute: '',
            startTimeHour: '',
            endTimeHour: '',
            dateInputFrom: '',
            dateInputTo: '',
            from: undefined,
            to: undefined,
            focus: ''
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dateInputFrom !== this.state.dateInputFrom
            || nextProps.dateInputTo !== this.state.dateInputTo) {

            const startDate = Moment(nextProps.dateInputFrom);
            const endDate = Moment(nextProps.dateInputTo);

            // Update the state with the new props.
            this.setState({
                dateInputFrom: startDate.format('ll HH:mm'),
                dateInputTo: endDate.format('ll HH:mm'),
                startTimeMinute: startDate.minutes(),
                endTimeMinute: endDate.minutes(),
                startTimeHour: startDate.hours(),
                endTimeHour: endDate.hours(),
                from: startDate.toDate(),
                to: endDate.toDate(),
                inputStartTimeMinute: startDate.minutes(),
                inputEndTimeMinute: endDate.minutes(),
                inputStartTimeHour: startDate.hours(),
                inputEndTimeHour: endDate.hours(),
                inputFrom: startDate.toDate(),
                inputTo: endDate.toDate(),
            });
        }
    }

    /**
     * Handle Click Outside
     *
     * Description: Handles click events outside of the date picker.
     * @param e {event} // The event object.
     */
    handleClickOutside(e) {
        if (!this.popover || !this.popover.contains(e.target)) {
            this.setState({ focus: '' });
        }
    }

    /**
     * Handle Day Click
     *
     * Description: Handles the day click event for the calendar.
     * @param day {object} // The selected day.
     * @param disabled {boolean} // True if disabled; false otherwise.
     */
    handleDayClick(day, { disabled }) {
        if (!disabled) {
            const range = DateUtils.addDayToRange(day, this.state);
            this.setState(range);
        }
    }

    /**
     * On Click
     *
     * Description: Handles the click event for the datepicker.
     */
    onClick() {
        this.setState({
            startTimeMinute: this.state.inputStartTimeMinute,
            endTimeMinute: this.state.inputEndTimeMinute,
            startTimeHour: this.state.inputStartTimeHour,
            endTimeHour: this.state.inputEndTimeHour,
            from: this.state.inputFrom,
            to: this.state.inputTo,
            focus: 'active'
        });
    }

    /**
     * On Apply
     *
     * Description: Handles the click event for the apply button.
     */
    onApply() {
        const mFrom = `${Moment(this.state.from).format('ll')} ${this.state.startTimeHour}:${this.state.startTimeMinute}`;
        const mTo =`${Moment(this.state.to).format('ll')} ${this.state.endTimeHour}:${this.state.endTimeMinute}`;
        const today = new Date();

        const mFromDate = Moment(mFrom, 'll HH:mm');
        const mToDate = Moment(mTo, 'll HH:mm');

        if (!mFromDate.isValid() || !mToDate.isValid() || mFromDate.isAfter(mToDate) || mToDate.isAfter(today)) {
            alert('Invalid Time Range!');
        } else {
            this.setState({
                dateInputFrom: mFrom,
                dateInputTo: mTo,
                inputStartTimeMinute: this.state.startTimeMinute,
                inputEndTimeMinute: this.state.endTimeMinute,
                inputStartTimeHour: this.state.startTimeHour,
                inputEndTimeHour: this.state.endTimeHour,
                inputFrom: this.state.from,
                inputTo: this.state.to,
                focus: ''
            });
            this.props.onDateRangeSelected(mFromDate, mToDate);
        }
    }

    render() {
        const { from, to } = this.state;
        const today = new Date();

        return (
            <div className="zk-ui-datepicker">
                <div className="zk-ui-datepicker-container">
                    <input
                        onClick={e => this.onClick(e)}
                        readOnly={true}
                        placeholder={this.props.intl.formatMessage({ id: 'start_date_label' })}
                        value={this.state.dateInputFrom}
                        className="zk-ui-input dark" />
                    <input
                        onClick={e => this.onClick(e)}
                        readOnly={true}
                        placeholder={this.props.intl.formatMessage({ id: 'end_date_label' })}
                        value={this.state.dateInputTo}
                        className="zk-ui-input dark" />
                    <div onClick={e => this.onClick(e)} className="zk-ui-dropdown-button">
                        <i className="fa fa-calendar"></i>
                    </div>
                </div>
                <div
                    ref={(popover) => { this.popover = popover; }}
                    className={`zk-ui-popover-container ${this.state.focus}`}>

                    <div className="zk-ui-arrow-up"></div>
                    <div className="zk-ui-popover-content">
                        <div className="zk-ui-datepicker-calendars">
                            <DayPicker
                                localeUtils={MomentLocaleUtils}
                                locale={this.props.locale}
                                toMonth={today}
                                disabledDays={{after: today}}
                                className="Selectable"
                                numberOfMonths={1}
                                selectedDays={[from, { from, to }]}
                                modifiers={{ start: from, end: to }}
                                onDayClick={this.handleDayClick.bind(this)}
                            />
                        </div>
                        <div className="zk-ui-datepicker-time">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="zk-ui-datepicker-date-label">
                                            <FormattedMessage
                                                id="start_time_label"
                                            />
                                        </td>
                                        <td className="zk-ui-datepicker-time-input">
                                            <input
                                                placeholder={this.props.intl.formatMessage({ id: 'hour_placeholder' })}
                                                className="zk-ui-input"
                                                value={this.state.startTimeHour}
                                                onChange={e => this.setState({ startTimeHour: e.target.value })} />
                                        </td>
                                        <td className="zk-ui-datepicker-time-input">
                                            <input
                                                placeholder={this.props.intl.formatMessage({
                                                    id: 'minute_placeholder'
                                                })}
                                                className="zk-ui-input"
                                                value={this.state.startTimeMinute}
                                                onChange={e => this.setState({ startTimeMinute: e.target.value })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="zk-ui-datepicker-date-label">
                                            <FormattedMessage
                                                id="end_time_label"
                                            />
                                        </td>
                                        <td className="zk-ui-datepicker-time-input">
                                            <input
                                                placeholder={this.props.intl.formatMessage({ id: 'hour_placeholder' })}
                                                className="zk-ui-input"
                                                value={this.state.endTimeHour}
                                                onChange={e => this.setState({ endTimeHour: e.target.value })}  />
                                        </td>
                                        <td className="zk-ui-datepicker-time-input">
                                            <input
                                                placeholder={this.props.intl.formatMessage({
                                                    id: 'minute_placeholder'
                                                })}
                                                className="zk-ui-input"
                                                value={this.state.endTimeMinute}
                                                onChange={e => this.setState({ endTimeMinute: e.target.value })}  />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={e => this.onApply(e)} className="zk-ui-button primary">
                                <FormattedMessage
                                    id="apply_label"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DateTimeRangePicker.defaultProps = {
    onDateRangeSelected: () => {},
    locale: 'en'
};

export default injectIntl(DateTimeRangePicker);
