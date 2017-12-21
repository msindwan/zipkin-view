/**
 * Zipkin-ui Browser component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Trace Browser.
 **/

import Zipkin from '../../../util/Zipkin';
import React from 'react';

const BrowserCell = ({ trace, onClick, width }) => (
    <div onClick={e => onClick(e, trace)} className="zk-ui-browser-card-cell">
        <div className="zk-ui-browser-card-cell-container">
            <table>
                <tbody>
                    <tr>
                        <td className="zk-ui-browser-card-cell-span-name">
                            <span>{Zipkin.getTraceService(trace)}</span>
                            <span className="zk-ui-trace-name">{Zipkin.getTraceName(trace)}</span>
                            <div className="zk-ui-browser-card-cell-num-spans">{`${Zipkin.getTraceSpanCount(trace)} Spans`}</div>
                        </td>
                        <td className="zk-ui-browser-card-cell-span-info">
                            <div style={{width: width}} className="zk-ui-browser-card-cell-span-width"></div>
                            <div className="zk-ui-browser-card-cell-span-duration">{Zipkin.getTraceDuration(trace)}</div>
                            <div className="zk-ui-browser-card-cell-span-date">{Zipkin.getTraceDate(trace)}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

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

    onTraceClick(e, trace) {
        this.props.history.push(`/traces/${Zipkin.getTraceID(trace)}`);
    }

    render() {
        let card = null;

        if (this.state.traces === null) {
            card = (
                <img
                    alt="OpenZipkin logo"
                    src="../images/zipkin-logo-200x119.jpg"
                    className="zk-ui-browser-card-content-placeholder" />
            );
        } else if (this.state.traces.length > 0) {
            const traceDurations = this.state.traces.map(t => Zipkin.getTraceDuration(t));
            const longestDuration = Math.max(...traceDurations);

            card = this.state.traces.map((trace, i) => {
                return (
                    <BrowserCell
                        width={`${traceDurations[i]*100/longestDuration}%`}
                        onClick={(e, trace) => this.onTraceClick(e, trace)}
                        trace={trace}
                        key={i} />
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
