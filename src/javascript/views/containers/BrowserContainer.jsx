/**
 * Zipkin-ui BrowserContainer
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Main application container.
 **/

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
        return (
            <div className="zk-ui-container">
                <Sidebar
                    { ...this.state.browser }
                    i18n={t} />
                <div className="zk-ui-content">
                    <Header i18n={t} />
                    <Browser i18n={t} />
                </div>
            </div>
        );
    }
}

export default translate()(BrowserContainer);
