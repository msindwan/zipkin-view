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
import { FormattedMessage } from 'react-intl';
import React from 'react';

class Sidebar extends React.Component {

    componentDidMount() {
        // Populate the list of services.
        BrowserActions.GetServices();
    }

    onFindTracesClicked(e) {
        // Fetch traces.
        BrowserActions.SetSelectedTrace(null);
        BrowserActions.GetTraces(this.props);
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
        const i18n = (s) => { return s };
        return (
            <div className="zk-ui-sidebar">
                <div className="zk-ui-logo">
                    <a href="/">Zipkin</a>
                </div>
                <div className="zk-ui-sidebar-wrapper">
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            <FormattedMessage
                                id="service_label" />
                        </span>
                        <Combobox
                            placeholder={'All'}
                            value={this.props.selectedService}
                            data={this.props.services}
                            onBlur={e => this.onServiceSelected(e)} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            <FormattedMessage
                                id="span_label" />
                        </span>
                        <Combobox
                            placeholder={'All'}
                            value={this.props.selectedSpan}
                            data={this.props.spans}
                            onBlur={e => BrowserActions.SetBrowserFilters({ selectedSpan: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Date Time Range') }
                        </span>
                        <DateTimeRangePicker
                            locale={navigator.language}
                            onDateRangeSelected={dateRange => BrowserActions.SetBrowserFilters({
                                dateRange: dateRange
                            })}
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
                        <span className="zk-ui-form-control-label zk-ui-form-help">
                            { i18n('Annotations') }
                        </span>
                        <textarea
                            placeholder="(e.g. 'http.path=/foo/bar/ and cache.miss ...')"
                            rows="5"
                            className="zk-ui-input"></textarea>
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
