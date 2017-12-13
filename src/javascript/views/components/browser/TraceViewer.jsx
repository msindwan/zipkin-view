/**
 * Zipkin-ui Browser component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-13
 *
 * Description : Trace Viewer.
 **/

import Zipkin from '../../../util/Zipkin';
import React from 'react';

class TraceViewer extends React.Component {

    constructor(props) {
        super(props);
    }

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
                parent._children_.push(span);
            }
        });

        console.log(roots);
        return roots;
    }

    getTableHeaders() {
        const headers = [ 'Service', '' ];
        const trace = this.props.trace;
        const interval = Zipkin.getTraceDuration(trace)/5;

        for (let i = 1; i <= 5; i++) {
            headers.push(`${(interval*i).toFixed(3)}s`);
        }

        return headers.map((header, i) => {
            return (<th key={i}>{header}</th>);
        });
    }

    getTableRows(spans, numHeaders, startTs) {
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

            console.log((span.timestamp - startTs) / 1000000);

            rows.push((
                <tr key={key++}>
                    <td>
                        <div style={{ marginLeft: depth*10 }} className="zk-ui-trace-service-name">
                            { span._children_.length ?
                                <i className="fa fa-minus"></i> :
                                <i className="fa fa-minus hidden"></i> }
                            <span>{span.annotations[0].endpoint.serviceName}</span>
                        </div>
                    </td>
                    <td>
                        <div className="zk-ui-trace-span"></div>
                    </td>
                    { emptyCells }
                </tr>
            ));
            depth++;
            span._children_.forEach(child => {
                child._depth_ = depth;
                spans.unshift(child);
            });
        }

        return rows;
    }

    render() {
        const spans = this.buildHeirarchy();
        const headers = this.getTableHeaders();
        const rows = this.getTableRows(spans, headers.length, spans[0].timestamp);

        return (
            <div className="zk-ui-trace-viewer">
                <div className="zk-ui-trace-viewer-container">
                    <div className="zk-ui-card">
                        <div className="zk-ui-card-header"></div>
                        <div className="zk-ui-card-content">
                            <table>
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

export default TraceViewer;
