/**
 * Zipkin-ui Sidebar component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : App Sidebar.
 **/

import { SetBrowserFilters, GetServices, GetSpans, FetchTraces } from '../../../actions/browser.js';
import DateTimeRangePicker from './controls/DateTimeRangePicker.jsx';
import Combobox from './controls/Combobox.jsx';
import React from 'react';

class Sidebar extends React.Component {

    componentDidMount() {
        // Populate the list of services.
        GetServices();
    }

    onFindTracesClicked(e) {
        // Fetch traces.
        FetchTraces();
    }

    onServiceSelected(e) {
        if (e.target.value !== this.props.selectedService) {
            // Update the selected service and fetch the new spans.
            SetBrowserFilters({
                selectedService: e.target.value,
                selectedSpan: ''
            });
            GetSpans(e.target.value);
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
                            onBlur={e => SetBrowserFilters({ selectedSpan: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Date Time Range') }
                        </span>
                        <DateTimeRangePicker
                            onDateRangeSelected={dateRange => SetBrowserFilters({ dateRange: dateRange })}
                            locale={document.documentElement.getAttribute("lang")}
                            i18n={i18n} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Duration') }
                        </span>
                        <input
                            className="zk-ui-input dark"
                            onBlur={e => SetBrowserFilters({ duration: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Limit') }
                        </span>
                        <input
                            className="zk-ui-input dark"
                            onBlur={e => SetBrowserFilters({ limit: e.target.value })} />
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
