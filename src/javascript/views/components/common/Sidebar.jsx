/**
 * Zipkin-ui Sidebar component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : App Sidebar.
 **/

import DateTimeRangePicker from './controls/DateTimeRangePicker.jsx';
import * as BrowserActions from '../../../actions/Browser.js';
import Combobox from './controls/Combobox.jsx';
import Input from './controls/Input.jsx';
import React from 'react';

class Sidebar extends React.Component {

    componentDidMount() {
        // Populate the list of services.
        BrowserActions.GetServices();
    }

    onFindTracesClicked(e) {
        // Fetch traces.
        BrowserActions.FetchTraces(this.props);
    }

    onServiceSelected(e) {
        if (e.target.value !== this.props.selectedService) {
            // Update the selected service and fetch the new spans.
            BrowserActions.SetBrowserFilters({
                selectedService: e.target.value,
                selectedSpan: ''
            });
            BrowserActions.GetSpans(e.target.value);
        }
    }

    render() {
        const i18n = this.props.i18n;
        return (
            <div className="zk-ui-sidebar">
                <div className="zk-ui-logo">
                    <a href="/">Zipkin</a>
                </div>
                <div className="zk-ui-sidebar-wrapper">
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Service') }
                        </span>
                        <Combobox
                            value={this.props.selectedService}
                            data={this.props.services}
                            onBlur={e => this.onServiceSelected(e)} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Span Name') }
                        </span>
                        <Combobox
                            value={this.props.selectedSpan}
                            data={this.props.spans}
                            onBlur={e => BrowserActions.SetBrowserFilters({ selectedSpan: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Date Time Range') }
                        </span>
                        <DateTimeRangePicker
                            onDateRangeSelected={dateRange => BrowserActions.SetBrowserFilters({
                                dateRange: dateRange
                            })}
                            locale={document.documentElement.getAttribute("lang")}
                            i18n={i18n} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Duration') }
                        </span>
                        <input
                            className="zk-ui-input dark"
                            onBlur={e => BrowserActions.SetBrowserFilters({ duration: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Limit') }
                        </span>
                        <input
                            className="zk-ui-input dark"
                            onBlur={e => BrowserActions.SetBrowserFilters({ limit: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Annotations') }
                            <i className="fa pull-right fa-question-circle"></i>
                        </span>
                        <textarea rows="5" className="zk-ui-input"></textarea>
                    </div>
                    <div className="zk-ui-form-control-container">
                        <button
                            onClick={e => this.onFindTracesClicked(e)}
                            className="zk-ui-button primary">
                            { i18n('Find Traces') }
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
