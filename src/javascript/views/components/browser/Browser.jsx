/**
 * Zipkin-ui Browser component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Trace Browser.
 **/

import { SetSelectedTrace } from '../../../actions/Browser';
import Zipkin from '../../../util/Zipkin';
import React from 'react';

const BrowserCell = ({ trace, onClick }) => (
    <div onClick={e => onClick(e, trace)} className="zk-ui-browser-card-cell">
        <div className="zk-ui-browser-card-cell-container">
            <table>
                <tbody>
                    <tr>
                        <td className="zk-ui-browser-card-cell-span-name">
                            <div>{Zipkin.getTraceName(trace)}</div>
                            <div className="zk-ui-browser-card-cell-num-spans">{`${Zipkin.getTraceSpanCount(trace)} Spans`}</div>
                        </td>
                        <td className="zk-ui-browser-card-cell-span-info">
                            <div className="zk-ui-browser-card-cell-span-width"></div>
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
            traces: props.traces
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.traces !== this.state.traces) {
            // Update the state with the new props.
            this.setState({
                traces: nextProps.traces
            });
        }
    }

    onSpanClick(e, trace) {
        SetSelectedTrace(trace);
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
            card = this.state.traces.map((trace, i) => {
                return (
                    <BrowserCell
                        onClick={(e, trace) => this.onSpanClick(e, trace)}
                        trace={trace}
                        key={i} />
                );
            });
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
