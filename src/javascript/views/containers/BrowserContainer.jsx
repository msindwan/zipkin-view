/**
 * Zipkin-ui BrowserContainer
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Main application container.
 **/

import TraceViewer from '../components/browser/TraceViewer.jsx';
import Browser from '../components/browser/Browser.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import Header from '../components/common/Header.jsx';
import { translate } from 'react-i18next';
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
        const t = this.props.t;
        let component;

        console.log(this.state.browser.selectedTrace);

        if (this.state.browser.selectedTrace === null) {
            component = (
                <Browser
                    { ...this.state.browser }
                    i18n={t} />
            );
        } else {
            component = (
                <TraceViewer
                    trace={this.state.browser.selectedTrace}
                    i18n={t} />
            );
        }

        return (
            <div className="zk-ui-container">
                <Sidebar
                    { ...this.state.browser }
                    i18n={t} />
                <div className="zk-ui-content">
                    <div className="zk-ui-content-container">
                        <Header i18n={t} />
                        { component }
                    </div>
                </div>
            </div>
        );
    }
}

export default translate()(BrowserContainer);
