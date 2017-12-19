/**
 * Zipkin-ui DatePicker
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-09
 *
 * Description : DatePicker control.
 **/

import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import Moment from 'moment';
import React from 'react';

class DateTimeRangePicker extends React.Component {

    constructor(props) {
    	super(props);
        Moment.locale(this.props.locale);
        this.state = {
            inputStartTimeMinute: '',
            inputEndTimeMinute: '',
            inputStartTimeHour: '',
            inputEndTimeHour: '',
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
        document.addEventListener(
            'click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener(
            'click', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(event) {
        if (!this.popover || !this.popover.contains(event.target)) {
            this.setState({ focus: '' });
        }
    }

    handleDayClick(day, { disabled, selected }) {
        if (!disabled) {
            const range = DateUtils.addDayToRange(day, this.state);
            this.setState(range);
        }
    }

    onClick(e) {
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

    onApply(e) {
        let mFrom = `${Moment(this.state.from).format('ll')} ${this.state.startTimeHour}:${this.state.startTimeMinute}`;
        let mTo =`${Moment(this.state.to).format('ll')} ${this.state.endTimeHour}:${this.state.endTimeMinute}`;
        const today = new Date();

        mFrom = Moment(mFrom, 'll HH:mm');
        mTo = Moment(mTo, 'll HH:mm');

        if (!mFrom.isValid() || !mTo.isValid() || mFrom.isAfter(mTo) || mTo.isAfter(today)) {
            alert('Invalid Time Range!');
        } else {
            this.setState({
                dateInputFrom: mFrom.format('lll'),
                dateInputTo: mTo.format('lll'),
                inputStartTimeMinute: this.state.startTimeMinute,
                inputEndTimeMinute: this.state.endTimeMinute,
                inputStartTimeHour: this.state.startTimeHour,
                inputEndTimeHour: this.state.endTimeHour,
                inputFrom: this.state.from,
                inputTo: this.state.to,
                focus: ''
            });
            this.props.onDateRangeSelected(mFrom, mTo);
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
                        placeholder={'Start Date'}
                        value={this.state.dateInputFrom}
                        className="zk-ui-input dark" />
                    <input
                        onClick={e => this.onClick(e)}
                        readOnly={true}
                        placeholder={'End Date'}
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
                                            { this.props.i18n('Start Time') }
                                        </td>
                                        <td className="zk-ui-datepicker-time-input">
                                            <input
                                                placeholder={'HH'}
                                                className="zk-ui-input"
                                                value={this.state.startTimeHour}
                                                onChange={e => this.setState({ startTimeHour: e.target.value })} />
                                        </td>
                                        <td className="zk-ui-datepicker-time-input">
                                            <input
                                                placeholder={'MM'}
                                                className="zk-ui-input"
                                                value={this.state.startTimeMinute}
                                                onChange={e => this.setState({ startTimeMinute: e.target.value })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="zk-ui-datepicker-date-label">
                                            { this.props.i18n('End Time') }
                                        </td>
                                        <td className="zk-ui-datepicker-time-input">
                                            <input
                                                placeholder={'HH'}
                                                className="zk-ui-input"
                                                value={this.state.endTimeHour}
                                                onChange={e => this.setState({ endTimeHour: e.target.value })}  />
                                        </td>
                                        <td className="zk-ui-datepicker-time-input">
                                            <input
                                                placeholder={'MM'}
                                                className="zk-ui-input"
                                                value={this.state.endTimeMinute}
                                                onChange={e => this.setState({ endTimeMinute: e.target.value })}  />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={e => this.onApply(e)} className="zk-ui-button primary">
                                { this.props.i18n('Apply') }
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

export default DateTimeRangePicker;
