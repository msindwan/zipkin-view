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

import { injectIntl, FormattedMessage } from 'react-intl';
import { SetSelectedTrace } from '../../../actions/Trace';
import Zipkin from '../../../util/Zipkin';
import React from 'react';

class TraceViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSpan: null,
            toggleState: {}
        };
    }

    /**
     * Toggle Children
     *
     * Description: Toggles the visibility of a span's children.
     * @param e {event}     // The event object.
     * @param span {object} // The selected span.
     */
    toggleChildren(e, span) {
        e.stopPropagation();
        let toggleState = this.state.toggleState[span.id];
        if (typeof toggleState === 'undefined') {
            toggleState = true;
        }

        toggleState = !toggleState;
        this.setState({
            toggleState: {
                ...this.state.toggleState,
                [span.id] : toggleState
            }
        });
    }

    /**
     * Set Selected Span
     *
     * Description: Sets the selected span to view annotations.
     * @param e {event}     // The event object.
     * @param span {object} // The selected span.
     */
    setSelectedSpan(e, span) {
        if (this.state.selectedSpan === span) {
            // Toggle the current span.
            span = null;
        }
        this.setState({ selectedSpan : span });
    }

    /**
     * Build Heirarchy
     *
     * Description: Builds the tree hierarchy for a trace.
     * @returns {array} // the tree for the trace.
     */
    buildHeirarchy() {
        const spanLookup = {};
        const roots = [];

        this.props.trace.forEach(span => {
            spanLookup[span.id] = span;
            span._children_ = [];
            if (typeof span.parentId === 'undefined') {
                roots.push(span);
            }
        });

        this.props.trace.forEach(span => {
            const parent = spanLookup[span.parentId];
            if (typeof parent !== 'undefined') {
                parent._children_.unshift(span);
            }
        });

        return roots;
    }

    /**
     * Get Table Headers
     *
     * Description: Returns the set of headers for the trace table.
     * @returns {array} // the set of headers.
     */
    getTableHeaders() {
        const headers = [ this.props.intl.formatMessage({ id: 'service_label'}), '' ];
        const trace = this.props.trace;
        const interval = Zipkin.GetTraceDuration(trace)/5;

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
    getTableRows(spans, numHeaders, startTs) {
        const duration = Zipkin.GetTraceDuration(this.props.trace);
        const rows = [];
        let key = 0;

        while (spans.length > 0) {
            const span = spans.shift();
            let depth = 0;
            if (typeof span._depth_ !== 'undefined') {
                depth = span._depth_;
            }

            const emptyCells = [];
            for (let i = numHeaders - 2; i > 0; i--) {
                emptyCells.push((<td key={i}></td>));
            }

            const left = ((span.timestamp - startTs) / duration) *(numHeaders - 1)*100  + '%';
            const width = (span.duration/duration) * 100 * (numHeaders - 1) + '%';
            const collapsed = this.state.toggleState[span.id] === false;

            rows.push((
                <tr
                    className={span === this.state.selectedSpan ? 'zk-ui-trace-span-selected' : '' }
                    onClick={e => this.setSelectedSpan(e, span)}
                    key={key++}>
                    <td>
                        <div style={{ marginLeft: depth*10 }} className="zk-ui-trace-service-name">
                            { span._children_.length ?
                                <i
                                    onClick={e => this.toggleChildren(e, span)}
                                    className={`fa fa-${collapsed ? 'plus' : 'minus'}`} /> :
                                <i className="fa fa-minus hidden"></i> }
                            <span>{Zipkin.GetSpanService(span)}</span>
                        </div>
                    </td>
                    <td>
                        <div className="zk-ui-trace-span" style={{ marginLeft: left, width: width }}></div>
                        <div className="zk-ui-trace-span-name" style={{ marginLeft: left }}>
                            {`${span.name} : ${Zipkin.DurationToString(span.duration, this.props.intl)}`}
                        </div>
                    </td>
                    { emptyCells }
                </tr>
            ));

            if (span === this.state.selectedSpan) {
                rows.push((
                    <tr className="zk-ui-trace-span-context-row" key={'selected-span'}>
                        <td colSpan={numHeaders}>
                            <div className="zk-ui-trace-span-context">
                                <div className="zk-ui-trace-span-name">
                                    {`${Zipkin.GetSpanService(span)}.${span.name} : ${Zipkin.DurationToString(span.duration, this.props.intl)}`}
                                </div>
                                <table className="zk-ui-trace-span-context-table">
                                    <tbody>
                                        <tr>
                                            <td className="header">
                                                <FormattedMessage
                                                    id="timestamp_label" />
                                            </td>
                                            <td className="header">
                                                <FormattedMessage
                                                    id="trace_id_label" />
                                            </td>
                                            <td className="header">
                                                <FormattedMessage
                                                    id="span_id_label" />
                                            </td>
                                            <td className="header">
                                                <FormattedMessage
                                                    id="parent_id_label" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{Zipkin.ConvertTimestampToDate(span.timestamp)}</td>
                                            <td>{Zipkin.GetTraceID(this.props.trace)}</td>
                                            <td>{span.id}</td>
                                            <td>{span.parentId}</td>
                                        </tr>
                                        { span.annotations && (
                                            <tr>
                                                <td className="header">
                                                    <FormattedMessage
                                                        id="annotation_label" />
                                                </td>
                                                <td className="header">
                                                    <FormattedMessage
                                                        id="date_time_label" />
                                                </td>
                                                <td className="header">
                                                    <FormattedMessage
                                                        id="relative_time_label" />
                                                </td>
                                                <td className="header">
                                                    <FormattedMessage
                                                        id="address_label" />
                                                </td>
                                            </tr>
                                        )}
                                        { span.annotations && span.annotations.map((annotation, i) => {
                                            let endpoint = annotation.endpoint.ipv4;
                                            if (annotation.endpoint.port) {
                                                endpoint += `:${annotation.endpoint.port}`;
                                            }
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <FormattedMessage
                                                            id={annotation.value} />
                                                    </td>
                                                    <td>
                                                        {Zipkin.ConvertTimestampToDate(annotation.timestamp)}
                                                    </td>
                                                    <td>
                                                        {
                                                            Zipkin.DurationToString(
                                                                annotation.timestamp - startTs,
                                                                this.props.intl
                                                            )
                                                        }
                                                    </td>
                                                    <td>
                                                        {`${endpoint} (${annotation.endpoint.serviceName})`}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        { span.binaryAnnotations && (
                                            <tr>
                                                <td className="header">
                                                    <FormattedMessage
                                                        id="key_label" />
                                                </td>
                                                <td className="header">
                                                    <FormattedMessage
                                                        id="value_label" />
                                                </td>
                                            </tr>
                                        )}
                                        {
                                            span.binaryAnnotations && span.binaryAnnotations.map((annotation, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{annotation.key}</td>
                                                        <td>{annotation.value}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                ));
            }

            depth++;

            if (!collapsed) {
                span._children_.forEach(child => {
                    child._depth_ = depth;
                    spans.unshift(child);
                });
            }
        }

        return rows;
    }

    /**
     * On Back Click
     *
     * Description: Handler for when the back button is clicked.
     */
    onBackClicked() {
        SetSelectedTrace(null);
        this.props.history.goBack();
    }

    render() {
        const spans = this.buildHeirarchy();
        const headers = this.getTableHeaders();
        const rows = this.getTableRows(spans, headers.length, spans[0].timestamp);

        return (
            <div className="zk-ui-trace-viewer">
                <div className="zk-ui-trace-viewer-container">
                    <div className="zk-ui-card">
                        <div className="zk-ui-card-header">
                            <div onClick={e => this.onBackClicked(e)} className="zk-ui-button">
                                <i className="fa fa-arrow-left"></i>
                                {' '}
                                <FormattedMessage
                                    id="back_label" />
                            </div>
                        </div>
                        <div className="zk-ui-card-content">
                            <table className="zk-ui-trace-table">
                                <thead>
                                    <tr>
                                        { headers }
                                    </tr>
                                </thead>
                                <tbody>
                                    { rows }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default injectIntl(TraceViewer);