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
 * Sidebar
 *
 * @Date : 2017-12-07
 * @Description : App Sidebar.
 **/

import DateTimeRangePicker from './controls/DateTimeRangePicker.jsx';
import * as BrowserActions from '../../../actions/Browser.js';
import { FormattedMessage, injectIntl } from 'react-intl';
import Combobox from './controls/Combobox.jsx';
import Utils from '../../../util/Utils.js';
import Moment from 'moment';
import React from 'react';

class Sidebar extends React.Component {

    /**
     * On Find Traces Clicked
     *
     * Description: The handler that's fired when the find traces button is submitted.
     */
    onFindTracesClicked() {
        // Reset the client-side cache.
        BrowserActions.SetBrowserFilters({
            queryKey: null
        });

        // Redirect to the same route with the correct query parameters.
        this.props.history.push(`/${Utils.URLify({
            serviceName: this.props.serviceName,
            spanName: this.props.spanName,
            endTs: this.props.endTs,
            startTs: this.props.startTs,
            minDuration: this.props.minDuration,
            limit: this.props.limit,
            annotationQuery: this.props.annotationQuery,
            sortOrder: this.props.sortOrder
        })}`);
    }

    /**
     * On Service Selected
     *
     * Description: The handler that's fired when the "find traces" button is submitted.
     * @param e {event} // The event object.
     */
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
        return (
            <div className={`zk-ui-sidebar ${!this.props.sidebarVisible ? 'zk-ui-sidebar-collapsed' : ''}`}>
                <div className="zk-ui-logo">
                    <a href="/">Zipkin View</a>
                </div>
                <div className="zk-ui-sidebar-wrapper">
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            <FormattedMessage
                                id="service_label" />
                        </span>
                        <Combobox
                            placeholder={this.props.intl.formatMessage({ id: 'all_placeholder_label' })}
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
                            placeholder={this.props.intl.formatMessage({ id: 'all_placeholder_label' })}
                            value={this.props.spanName}
                            data={this.props.spans}
                            onBlur={e => BrowserActions.SetBrowserFilters({ spanName: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            <FormattedMessage
                                id="date_time_range_label" />
                        </span>
                        <DateTimeRangePicker
                            dateInputFrom={this.props.startTs}
                            dateInputTo={this.props.endTs}
                            locale={navigator.language}
                            onDateRangeSelected={(from, to) => BrowserActions.SetBrowserFilters({
                                endTs: Moment(to).valueOf(),
                                startTs: Moment(from).valueOf()
                            })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            <FormattedMessage
                                id="duration_label" />
                        </span>
                        <input
                            value={this.props.minDuration || ''}
                            className="zk-ui-input dark"
                            onChange={e => BrowserActions.SetBrowserFilters({ minDuration: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label">
                            <FormattedMessage
                                id="limit_label" />
                        </span>
                        <input
                            value={this.props.limit || ''}
                            className="zk-ui-input dark"
                            onChange={e => BrowserActions.SetBrowserFilters({ limit: e.target.value })} />
                    </div>
                    <div className="zk-ui-form-control-container">
                        <span className="zk-ui-form-control-label zk-ui-form-help">
                            <FormattedMessage
                                id="annotations_label" />
                        </span>
                        <textarea
                            value={this.props.annotationQuery}
                            onChange={e => BrowserActions.SetBrowserFilters({
                                annotationQuery: e.target.value
                            })}
                            placeholder={this.props.intl.formatMessage({ id: 'annotations_placeholder_label' })}
                            rows="5"
                            className="zk-ui-input"></textarea>
                    </div>
                    <div className="zk-ui-form-control-container">
                        <button
                            onClick={() => this.onFindTracesClicked()}
                            className="zk-ui-button primary">
                            <FormattedMessage
                                id="find_traces_label" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(Sidebar);
