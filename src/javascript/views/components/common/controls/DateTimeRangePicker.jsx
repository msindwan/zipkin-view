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
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            startTime: '',
            endTime: '',
            inputStartTime: '',
            inputEndTime: '',
            dateInput: '',
            inputFrom: undefined,
            inputTo: undefined,
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
            startTime: this.state.inputStartTime,
            endTime: this.state.inputEndTime,
            from: this.state.inputFrom,
            to: this.state.inputTo,
            focus: 'active'
        });
    }

    onPredefinedRangeClick(e, range) {
        this.setState({
            from: range.from,
            to: range.to
        });
    }

    onApply(e) {
        this.setState({
            dateInput: `${Moment(this.state.from).format("l")} ${this.state.startTime} to ${Moment(this.state.to).format("l")} ${this.state.endTime}`,
            inputStartTime: this.state.startTime,
            inputEndTime: this.state.endTime,
            inputFrom: this.state.from,
            inputTo: this.state.to,
            focus: ''
        });
        this.props.onDateRangeSelected({
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            from: this.state.from,
            to: this.state.to,
        });
    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        const today = new Date();
        Moment.locale(this.props.locale);
        const defaultStart = Moment().startOf("day").format("LT");
        const defaultEnd   = Moment().endOf("day").format("LT");

        return (
        	<div className="zk-ui-datepicker">
                <div className="zk-ui-datepicker-container">
                    <input
                        onChange={e => this.setState({ dateInput : e.target.value })}
                        value={this.state.dateInput}
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
                        <div className="zk-ui-datepicker-predefined">
                        {
                            this.props.predefinedRanges.map((range, i) => {
                                return (
                                    <div
                                        key={i}
                                        onClick={e => this.onPredefinedRangeClick(e, range)}
                                        className="zk-ui-datepicker-predefined-row">
                                            {range.value}
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className="zk-ui-datepicker-calendars">
                            <DayPicker
                                toMonth={today}
                                disabledDays={{after: today}}
                                className="Selectable"
                                numberOfMonths={2}
                                selectedDays={[from, { from, to }]}
                                modifiers={modifiers}
                                onDayClick={this.handleDayClick}
                                />
                        </div>
                        <div className="zk-ui-datepicker-time">
                            <label>{this.props.i18n('Start Time')}</label>
                            <input
                                value={this.state.startTime}
                                onChange={e => this.setState({ startTime: e.target.value })}
                                placeholder={defaultStart} />
                            <label>{this.props.i18n('End Time')}</label>
                            <input
                                value={this.state.endTime}
                                onChange={e => this.setState({ endTime: e.target.value })}
                                placeholder={defaultEnd} />
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
    predefinedRanges: [{
        value: Moment().subtract(7, 'days').fromNow(),
        from:  Moment().subtract(7, 'days').startOf('day').toDate(),
        to:    Moment().endOf('day').toDate()
    },{
        value: Moment().subtract(30, 'days').fromNow(),
        from:  Moment().subtract(30, 'days').startOf('day').toDate(),
        to:    Moment().endOf('day').toDate()
    }],
    locale: 'en',
    onDateRangeSelected: () => {}
};

export default DateTimeRangePicker;
