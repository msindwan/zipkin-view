/**
 * Zipkin-ui BrowserContainer
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Browser container.
 **/

import { GetTraces, SetBrowserFilters, SetTraces } from '../../actions/Browser';
import { SetSelectedTrace } from '../../actions/Trace';
import Browser from '../components/browser/Browser.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import Header from '../components/common/Header.jsx';
import Utils from '../../util/Utils';
import AppStore from '../../Store';
import Moment from 'moment';
import React from 'react';

class BrowserContainer extends React.Component {

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
        const queryParams = Utils.GetQueryParams();
        SetSelectedTrace(null);
        SetTraces(null);

        if (Object.keys(queryParams).length > 0) {
            const query = {
                serviceName: queryParams['serviceName'],
                spanName: queryParams['spanName'],
                minDuration: queryParams['minDuration'],
                limit: queryParams['limit'],
                annotationQuery: queryParams['annotationQuery'],
                sortOrder: queryParams['sortOrder']
            };

            const endTs = parseInt(queryParams['endTs']);
            const startTs = parseInt(queryParams['startTs']);

            if (!isNaN(endTs)) {
                query['endTs'] = endTs;
            }

            if (!isNaN(startTs)) {
                query['startTs'] = startTs;
            }

            // Fetch traces.
            SetBrowserFilters(query);
            GetTraces(query);
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
                    { ...this.state.browser } />
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

export default BrowserContainer;
