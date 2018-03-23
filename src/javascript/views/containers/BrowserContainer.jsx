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
 * BrowserContainer
 *
 * @Date : 2017-12-07
 * @Description : Browser Container.
 **/

import { GetTraces, SetBrowserFilters, SetTraces } from '../../actions/Browser';
import AbstractContainer from './AbstractContainer.jsx';
import { SetSelectedTrace } from '../../actions/Trace';
import Browser from '../components/browser/Browser.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import Header from '../components/common/Header.jsx';
import Utils from '../../util/Utils';
import React from 'react';

class BrowserContainer extends AbstractContainer {

    /**
     * Load State from History
     *
     * Description: Loads the state from the current location.
     */
    loadStateFromHistory() {
        const queryParams = Utils.GetQueryParams();
        SetSelectedTrace(null);

        if (Object.keys(queryParams).length > 0) {
            const query = {
                serviceName: queryParams.serviceName,
                spanName: queryParams.spanName,
                minDuration: queryParams.minDuration,
                limit: queryParams.limit,
                annotationQuery: queryParams.annotationQuery,
                sortOrder: queryParams.sortOrder,
                queryKey: this.props.location.key
            };

            if (!isNaN(queryParams.endTs)) {
                query.endTs = parseInt(queryParams.endTs);
            }
            if (!isNaN(queryParams.startTs)) {
                query.startTs = parseInt(queryParams.startTs);
            }

            if (this.props.location.key !== this.state.browser.queryKey) {
                // Fetch traces.
                SetBrowserFilters(query);
                GetTraces(query);
            }
        } else {
            SetTraces(null);
        }
    }

    render() {
        let component;

        if (this.state.browser.loading) {
            component = (
                <div className="zk-ui-loader"></div>
            );
        } else {
            component = (
                <Browser
                    history={this.props.history}
                    storage={this.state.global.storage}
                    { ...this.state.browser } />
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

export default BrowserContainer;
