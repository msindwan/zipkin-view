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
 * Trace Viewer
 *
 * @Date : 2017-12-13
 * @Description : Trace Container.
 **/

import ClusterizedContainer from '../common/controls/ClusterizedContainer.jsx';
import { SetSpanToggleState, SetSelectedSpan } from '../../../actions/Trace';
import { injectIntl, FormattedMessage } from 'react-intl';
import TraceSpanRow from './TraceSpanRow.jsx';
import Zipkin from '../../../util/Zipkin';
import TraceRow from './TraceRow.jsx';
import React from 'react';

class TraceViewer extends React.Component {

    /**
     * Get Table Headers
     *
     * Description: Returns the set of headers for the trace table.
     * @returns {array} // the set of headers.
     */
    getTableHeaders() {
        const headers = [ this.props.intl.formatMessage({ id: 'service_label'}) ];
        const interval = Zipkin.GetTraceDuration(this.props.selectedTrace)/5;

        for (let i = 1; i <= 5; i++) {
            headers.push(Zipkin.DurationToString(interval*i, this.props.intl));
        }

        return headers.map((header, i) => {
            return (<th key={i}>{header}</th>);
        });
    }

    /**
     * Get Table Rows
     *
     * Description: Returns the set of rows for the trace table.
     * @param spans {array}    // The set of spans to render.
     * @param numHeaders {int} // The number of headers.
     * @param startTs (int)    // The starting timestamp
     * @returns {array}        // the set of rows.
     */
    getTableRows(numHeaders) {
        const duration = Zipkin.GetTraceDuration(this.props.selectedTrace);
        const startTs = Zipkin.GetTraceTimestamp(this.props.selectedTrace);
        const spans = [ ...this.props.spans ];
        const rows = [];

        while (spans.length > 0) {
            const span = spans.pop();
            let depth = 0;
            if (typeof span._depth_ !== 'undefined') {
                depth = span._depth_;
            }

            const left = ((span.timestamp - startTs) / duration) * (numHeaders - 1) * 100 + '%';
            const width = `calc(${Math.max((span.duration/duration) * 100 * (numHeaders - 1), 1)}% + 6px)`;
            const collapsed = this.props.spanToggleState[span.id] === false;

            rows.push((
                <TraceRow
                    numHeaders={numHeaders}
                    key={span.id}
                    intl={this.props.intl}
                    span={span}
                    className={`zk-ui-trace-span-row ${span === this.props.selectedSpan ? 'zk-ui-trace-span-selected' : ''}`}
                    onSpanClick={e => this.setSelectedSpan(e, span)}
                    depth={depth*10}
                    left={left}
                    width={width}
                    onToggleClicked={e => this.toggleChildren(e, span)}
                    collapsed={collapsed}>
                </TraceRow>
            ));

            if (span === this.props.selectedSpan) {
                rows.push((
                    <TraceSpanRow
                        key={'selected-span'}
                        numHeaders={numHeaders}
                        traceId={this.props.selectedTrace.traceId}
                        startTs={startTs}
                        span={span}
                        intl={this.props.intl}
                    />
                ));
            }

            depth++;

            if (!collapsed) {
                span._children_.forEach(child => {
                    child._depth_ = depth;
                    spans.push(child);
                });
            }
        }

        return rows;
    }

    /**
     * On Row Click
     *
     * Description: Handler for when a row is clicked.
     * @param e {event} // The event object.
     */
    onRowClicked(e, row) {
        e.stopPropagation();
        const spanId = row.dataset.key;
        if (e.target.classList.contains('zk-ui-trace-span-toggle')) {
            // Toggle children.
            SetSpanToggleState(spanId);
        } else if (typeof spanId !== 'undefined') {
            // Set the selected span.
            const span = this.props.spanLookup[spanId];
            SetSelectedSpan(this.props.selectedSpan === span ? null : span);
        }
    }

    /**
     * Download JSON
     *
     * Description: Downloads the current trace object as JSON.
     */
    downloadJSON() {
        // Copy over the trace object with UI-specific attributes stripped.
        const trace = this.props.selectedTrace.spans.map(span => {
            const newSpan = Object.assign({}, span);
            delete newSpan._children_;
            delete newSpan._depth_;
            return newSpan;
        });
        const blob = new Blob([JSON.stringify(trace)], {type: "application/json"});
        const url  = URL.createObjectURL(blob);

        const node = document.createElement('a');
        document.body.appendChild(node);
        node.setAttribute("href", url);
        node.setAttribute("download", `${this.props.selectedTrace.traceId}.json`);
        node.click();
        node.remove();
    }

    render() {
        const headers = this.getTableHeaders();
        const rows = this.getTableRows(headers.length);

        return (
            <div className="zk-ui-trace-viewer">
                <div className="zk-ui-trace-viewer-container">
                    <div className="zk-ui-card">
                        <div className="zk-ui-card-header">
                            <div onClick={() => this.props.history.goBack()} className="zk-ui-button">
                                <i className="fa fa-arrow-left"></i>
                                {' '}
                                <FormattedMessage
                                    id="back_label" />
                            </div>
                            <div className="zk-ui-card-right-menu">
                                <div
                                    onClick={e => this.downloadJSON(e)}
                                    className="zk-ui-button">
                                    <i className="fa fa-download"></i>
                                </div>
                            </div>
                        </div>
                        <div id="trace_view_container" className="zk-ui-card-content">
                            <table className="zk-ui-trace-table">
                                <thead>
                                    <tr>
                                        { headers }
                                    </tr>
                                </thead>
                                <ClusterizedContainer
                                    container="tbody"
                                    scrollId="trace_view_container"
                                    rows_in_block={100}
                                    onRowClick={(e, row) => this.onRowClicked(e, row)}>
                                    { rows }
                                </ClusterizedContainer>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default injectIntl(TraceViewer);
