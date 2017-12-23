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
 * Zipkin-ui TraceContainer
 *
 * @Date : 2017-12-07
 * @Description : Trace container.
 **/

import TraceViewer from '../components/trace/TraceViewer.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import Header from '../components/common/Header.jsx';
import { GetTrace } from '../../actions/Trace';
import AppStore from '../../Store';
import React from 'react';

class TraceContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = AppStore.getState();
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

    /**
     * Load State from History
     *
     * Description: Loads the state from the current location.
     */
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
