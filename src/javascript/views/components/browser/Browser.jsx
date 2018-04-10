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
 * Browser
 *
 * @Date : 2017-12-07
 * @Description : Trace Browser.
 **/

import { DeleteLocalTrace, SetSelectedTrace } from '../../../actions/Trace';
import { SetBrowserFilters } from '../../../actions/Browser';
import { injectIntl, FormattedMessage } from 'react-intl';
import Dropdown from '../common/controls/Dropdown.jsx';
import { SetStorage } from '../../../actions/Global';
import Zipkin from '../../../util/Zipkin';
import BrowserRow from './BrowserRow.jsx';
import React from 'react';

class Browser extends React.Component {

    /**
     * Get Sort Options
     *
     * Description: Gets the sort options for the browser.
     * @returns {array} // The list of sort options.
     */
    getSortOptions() {
        const sortOptions = [
            {
                label: this.props.intl.formatMessage({ id: 'duration-asc' }),
                value: 'duration-asc'
            },
            {
                label: this.props.intl.formatMessage({ id: 'duration-desc' }),
                value: 'duration-desc'
            },
            {
                label: this.props.intl.formatMessage({ id: 'timestamp-asc' }),
                value: 'timestamp-asc'
            },
            {
                label: this.props.intl.formatMessage({ id: 'timestamp-desc' }),
                value: 'timestamp-desc'
            }
        ];

        if (this.props.storage === 'local') {
            sortOptions.unshift({
                label: this.props.intl.formatMessage({ id: 'upload-date-desc' }),
                value: 'upload-date-desc'
            });
            sortOptions.unshift({
                label: this.props.intl.formatMessage({ id: 'upload-date-asc' }),
                value: 'upload-date-asc'
            });
        }
        return sortOptions;
    }

    /**
     * Get Trace Rows
     *
     * Description: Creates a browser row for each trace.
     * @param traces {array} // The collection of trace objects.
     * @returns {array}      // The browser rows.
     */
    getTraceRows() {
        const traces = this.props.storage === 'remote' ?
            this.props.traces:
            this.props.localTraces;

        // A search hasn't been initiated.
        if (traces === null) {
            return (
                <div className="zk-ui-browser-card-content-placeholder">
                    <div>
                        <FormattedMessage
                            id="search_for_traces_placeholder_label" />
                    </div>
                </div>
            );
        }

        // No traces found.
        if (traces.length === 0) {
            return (
                <div className="zk-ui-browser-card-content-placeholder">
                    <FormattedMessage
                        id="no_traces_found_placeholder_label" />
                </div>
            );
        }

        const sortedTraces = [ ...traces ].sort((a, b) => {
            switch(this.props.sortOrder) {
                case 'upload-date-asc':
                    return b.date - a.date;
                case 'upload-date-desc':
                    return a.date - b.date;
                case 'timestamp-asc':
                    return Zipkin.GetTraceTimestamp(b) - Zipkin.GetTraceTimestamp(a);
                case 'timestamp-desc':
                    return Zipkin.GetTraceTimestamp(a) - Zipkin.GetTraceTimestamp(b);
                case 'duration-asc':
                    return Zipkin.GetTraceDuration(a) - Zipkin.GetTraceDuration(b);
                case 'duration-desc':
                default:
                    return Zipkin.GetTraceDuration(b) - Zipkin.GetTraceDuration(a);
            }
        });

        const traceDurations = sortedTraces.map(t => Zipkin.GetTraceDuration(t));
        const maxDuration = Math.max(...traceDurations);

        return sortedTraces.map((trace, i) => {
            return (
                <BrowserRow
                    key={trace.traceId}
                    onDeleteLocalTraceClick={e => this.onDeleteLocalTraceClick(e, trace)}
                    onTraceClick={(e, trace) => this.onTraceClick(e, trace)}
                    traceWidth={`${traceDurations[i]*100/maxDuration}%`}
                    isDeleted={this.props.storage === 'local' && this.props.deletingLocalTraces[trace.traceId]}
                    canDelete={this.props.storage === 'local'}
                    trace={trace}
                    intl={this.props.intl} />
            );
        });
    }

    /**
     * Delete Local Trace
     *
     * Description: Deletes the selected local trace.
     * @param e {event} // The event object.
     * @returns {trace} // The trace object.
     */
    onDeleteLocalTraceClick(e, trace) {
        e.stopPropagation();
        DeleteLocalTrace(trace.traceId);
    }

    /**
     * On Trace Click
     *
     * Description: The handler that's fired when a trace is clicked.
     * @param e {event}      // The event object.
     * @param trace {object} // The selected trace.
     */
    onTraceClick(e, trace) {
        SetSelectedTrace(trace);
        this.props.history.push(`${process.env.ZIPKIN_UI_PREFIX}traces/${trace.traceId}?storage=${this.props.storage}`);
    }

    render() {
        return (
            <div className="zk-ui-browser">
                <div className="zk-ui-browser-container">
                    <div className="zk-ui-card">
                        <div className="zk-ui-card-header">
                            <div className="zk-ui-card-tabs">
                                <div
                                    onClick={() => SetStorage('remote')}
                                    className={`zk-ui-button zk-ui-tab ${this.props.storage === 'remote' ? 'selected' : ''}`}>
                                    <FormattedMessage
                                        id="remote_traces_label" />
                                </div>
                                <div
                                    onClick={() => SetStorage('local')}
                                    className={`zk-ui-button zk-ui-tab ${this.props.storage !== 'remote' ? 'selected' : ''}`}>
                                    <FormattedMessage
                                        id="uploaded_traces_label" />
                                </div>
                            </div>
                            <div className="zk-ui-card-right-menu">
                                <Dropdown
                                    value={this.props.intl.formatMessage({ id: this.props.sortOrder })}
                                    onOptionSelected={option => SetBrowserFilters({ sortOrder : option.value })}
                                    data={this.getSortOptions()}
                                    className="zk-ui-browser-sort-options" />
                            </div>
                        </div>
                        <div className="zk-ui-card-content">
                            { this.getTraceRows() }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default injectIntl(Browser);
