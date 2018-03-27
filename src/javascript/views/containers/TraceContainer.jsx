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
 * TraceContainer
 *
 * @Date : 2017-12-07
 * @Description : Trace Container.
 **/

import { GetTrace, GetLocalTrace } from '../../actions/Trace';
import TraceViewer from '../components/trace/TraceViewer.jsx';
import AbstractContainer from './AbstractContainer.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import Header from '../components/common/Header.jsx';
import { injectIntl } from 'react-intl';
import Utils from '../../util/Utils';
import React from 'react';

class TraceContainer extends AbstractContainer {

    /**
     * Load State from History
     *
     * Description: Loads the state from the current location.
     */
    loadStateFromHistory() {
        const traceId = this.props.match.params.traceId;
        const queryParams = Utils.GetQueryParams();
        const storage = queryParams['storage'] || 'remote';

        // Don't fetch the trace if we already have it in memory.
        if (this.state.trace.selectedTrace == null ||
            this.state.trace.selectedTrace.traceId !== traceId ||
            storage !== this.state.global.storage
        ) {
            if (storage === 'local') {
                GetLocalTrace(traceId, this.props.intl);
            } else {
                GetTrace(traceId);
            }
        }
    }

    render() {
        let component;

        if (this.state.trace.loading) {
            component = (
                <div className="zk-ui-loader"></div>
            );
        } else if (this.state.trace.hierarchy !== null) {
            component = (
                <TraceViewer
                    history={this.props.history}
                    { ...this.state.trace } />
            );
        }

        return (
            <div className="zk-ui-container">
                <Sidebar
                    history={this.props.history}
                    { ...this.state.global }
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

export default injectIntl(TraceContainer);
