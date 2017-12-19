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
import { IntlProvider } from 'react-intl';
import ReactDOM from 'react-dom';
import React from 'react';
import Intl from './Intl';

// App entry point.
window.addEventListener("load", () => {
    ReactDOM.render((
        <IntlProvider
            locale={Intl.GetLocale()}
            messages={Intl.GetTranslations()}>
            <Router>
                <Switch>
                    <Route exact path="/" component={BrowserContainer}/>
                    <Route component={NotFoundContainer}/>
                </Switch>
            </Router>
        </IntlProvider>
    ), document.getElementById("app"));
});
