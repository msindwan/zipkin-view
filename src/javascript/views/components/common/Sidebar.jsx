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
import Utils from '../../../util/Utils.js';
import Moment from 'moment';
import React from 'react';

class Sidebar extends React.Component {

    componentDidMount() {
        // Populate the list of services.
        BrowserActions.GetServices();
    }

    onFindTracesClicked(e) {
        // Construct the query object.
        const query = {
            serviceName: this.props.serviceName,
            spanName: this.props.spanName,
            endTs: this.props.endTs,
            startTs: this.props.startTs,
            minDuration: this.props.minDuration,
            limit: this.props.limit,
            annotationQuery: this.props.annotationQuery,
            sortOrder: this.props.sortOrder
        };

        // Redirect to the same route with the correct query parameters.
        this.props.history.push(`/${Utils.URLify(query)}`);
    }

    onServiceSelected(e) {
        if (e.target.value !== this.props.selectedService) {
            // Update the selected service and fetch the new spans.
            BrowserActions.SetBrowserFilters({
                serviceName: e.target.value,
                spanName: ''
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
                            value={this.props.serviceName}
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
                            value={this.props.spanName}
                            data={this.props.spans}
                            onBlur={e => BrowserActions.SetBrowserFilters({ spanName: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Date Time Range') }
                        </span>
                        <DateTimeRangePicker
                            dateInputFrom={this.props.startTs}
                            dateInputTo={this.props.endTs}
                            locale={navigator.language}
                            onDateRangeSelected={(from, to) => BrowserActions.SetBrowserFilters({
                                endTs: Moment(to).valueOf(),
                                startTs: Moment(from).valueOf()
                            })}
                            i18n={i18n} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Duration') }
                        </span>
                        <input
                            value={this.props.minDuration}
                            className="zk-ui-input dark"
                            onChange={e => BrowserActions.SetBrowserFilters({ minDuration: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            { i18n('Limit') }
                        </span>
                        <input
                            value={this.props.limit}
                            className="zk-ui-input dark"
                            onChange={e => BrowserActions.SetBrowserFilters({ limit: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label zk-ui-form-help">
                            { i18n('Annotations') }
                        </span>
                        <textarea
                            value={this.props.annotationQuery}
                            onChange={e => BrowserActions.SetBrowserFilters({
                                annotationQuery: e.target.value
                            })}
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
