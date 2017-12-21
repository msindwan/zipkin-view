/**
 * Zipkin-ui TraceContainer
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Trace container.
 **/

import TraceViewer from '../components/trace/TraceViewer.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import Header from '../components/common/Header.jsx';
import { GetTrace } from '../../actions/Trace';
import Zipkin from '../../util/Zipkin';
import AppStore from '../../Store';
import React from 'react';

class TraceContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        // Return the initial application state.
        return AppStore.getState();
    }

    componentDidMount() {
        // Subscribe to the store and update the state on change.
        AppStore.subscribe(( _, store) => this.setState(store));
        this.loadStateFromHistory();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.loadStateFromHistory();
        }
    }

    loadStateFromHistory() {
        const traceId = this.props.match.params.traceId;
        GetTrace(traceId);
    }

    render() {
        let component;

        if (this.state.trace.loading) {
            component = (
                <div className="zk-ui-loader"></div>
            );
        } else if (this.state.trace.selectedTrace !== null) {
            component = (
                <TraceViewer
                    history={this.props.history}
                    trace={this.state.trace.selectedTrace} />
            );
        }

        return (
            <div className="zk-ui-container">
                <Sidebar
                    history={this.props.history}
                    { ...this.state.browser } />
                <div className="zk-ui-content">
                    <div className="zk-ui-content-container">
                        <Header
                            history={this.props.history} />
                        { component }
                    </div>
                </div>
            </div>
        );
    }
}

export default TraceContainer;
