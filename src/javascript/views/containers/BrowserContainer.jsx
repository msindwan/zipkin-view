/**
 * Zipkin-ui BrowserContainer
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Main application container.
 **/

import TraceBrowser from '../components/browser/TraceBrowser.jsx';
import TraceViewer from '../components/browser/TraceViewer.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import Header from '../components/common/Header.jsx';
import AppStore from '../../Store';
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
    }

    render() {
        let component;

        if (this.state.browser.loading) {
            component = (
                <div className="zk-ui-loader"></div>
            );
        } else if (this.state.browser.selectedTrace === null) {
            component = (
                <TraceBrowser
                    { ...this.state.browser } />
            );
        } else {
            component = (
                <TraceViewer
                    trace={this.state.browser.selectedTrace} />
            );
        }

        return (
            <div className="zk-ui-container">
                <Sidebar
                    { ...this.state.browser } />
                <div className="zk-ui-content">
                    <div className="zk-ui-content-container">
                        <Header />
                        { component }
                    </div>
                </div>
            </div>
        );
    }
}

export default BrowserContainer;
