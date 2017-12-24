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

import Zipkin from '../../../util/Zipkin';
import React from 'react';

class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            traces: props.traces,
            loading: props.loading
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.traces !== this.state.traces || nextProps.loading != this.state.loading) {
            // Update the state with the new props.
            this.setState({
                traces: nextProps.traces,
                loading: nextProps.loading
            });
        }
    }

    /**
     * On Trace Click
     *
     * Description: The handler that's fired when a trace is clicked.
     * @param e {event}      // The event object.
     * @param trace {object} // The selected trace.
     */
    onTraceClick(e, trace) {
        this.props.history.push(`/traces/${Zipkin.GetTraceID(trace)}`);
    }

    render() {
        let card = null;

        if (this.state.traces === null) {
            card = (
                <div className="zk-ui-browser-card-content-placeholder">
                    <div className="zk-ui-placeholder-title">ZIPKIN VIEW</div>
                    <div>Search for Traces</div>
                </div>
            );
        } else if (this.state.traces.length > 0) {
            const traceDurations = this.state.traces.map(t => Zipkin.GetTraceDuration(t));
            const longestDuration = Math.max(...traceDurations);

            card = this.state.traces.map((trace, i) => {
                return (
                    <div
                        key={i}
                        onClick={e => this.onTraceClick(e, trace)}
                        className="zk-ui-browser-card-cell">
                        <div className="zk-ui-browser-card-cell-container">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="zk-ui-browser-card-cell-span-name">
                                            <span>
                                                {Zipkin.GetTraceService(trace)}
                                            </span>
                                            <span className="zk-ui-trace-name">
                                                {Zipkin.GetTraceName(trace)}
                                            </span>
                                            <div className="zk-ui-browser-card-cell-num-spans">
                                                {`${Zipkin.GetTraceSpanCount(trace)} Spans`}
                                            </div>
                                        </td>
                                        <td className="zk-ui-browser-card-cell-span-info">
                                            <div
                                                style={{width: `${traceDurations[i]*100/longestDuration}%`}}
                                                className="zk-ui-browser-card-cell-span-width" />
                                            <div className="zk-ui-browser-card-cell-span-duration">
                                                {Zipkin.GetTraceDuration(trace)}
                                            </div>
                                            <div className="zk-ui-browser-card-cell-span-date">
                                                {Zipkin.GetTraceDate(trace)}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            });
        } else {
            card = (
                <div className="zk-ui-traces-placeholder">
                    No traces were found
                </div>
            );
        }

        return (
            <div className="zk-ui-browser">
                <div className="zk-ui-browser-container">
                    <div className="zk-ui-card">
                        <div className="zk-ui-card-header"></div>
                        <div className="zk-ui-card-content">
                            { card }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Browser;
