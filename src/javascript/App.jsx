/**
 * Zipkin-ui Javascript Entry Point
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Defines the entry point for the app.
 **/

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundContainer from './views/containers/NotFoundContainer.jsx';
import BrowserContainer from './views/containers/BrowserContainer.jsx';
import { I18nextProvider } from 'react-i18next';
import ReactDOM from 'react-dom';
import React from 'react';
import i18n from './I18n';

// App entry point.
window.addEventListener("load", function() {
    ReactDOM.render((
        <I18nextProvider i18n={i18n}>
            <Router>
                <Switch>
                    <Route exact path="/" component={BrowserContainer}/>
                    <Route component={NotFoundContainer}/>
                </Switch>
            </Router>
        </I18nextProvider>
    ), document.getElementById("app"));
});
