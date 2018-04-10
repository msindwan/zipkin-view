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
 * Javascript Entry Point
 *
 * @Date : 2017-12-07
 * @Description : Defines the entry point for the app.
 **/

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundContainer from './views/containers/NotFoundContainer.jsx';
import BrowserContainer from './views/containers/BrowserContainer.jsx';
import TraceContainer from './views/containers/TraceContainer.jsx';
import { GetServices, GetLocalTraces } from './actions/Browser';
import { GetConfig } from './actions/Global';
import { IntlProvider } from 'react-intl';
import ReactDOM from 'react-dom';
import React from 'react';
import Intl from './Intl';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.fetchInitialData();
        this.intl = new Intl(navigator.language);
    }

    /**
     * Fetch Initial Data
     *
     * Description: Dispatches async calls to populate initial application data.
     */
    fetchInitialData() {
        GetConfig();
        GetServices();
        GetLocalTraces();
    }

    render() {
        return (
            <IntlProvider
                locale={this.intl.getLocale()}
                messages={this.intl.getTranslations()}>
                <Router>
                    <Switch>
                        <Route exact path={`${process.env.ZIPKIN_UI_PREFIX}`} component={BrowserContainer}/>
                        <Route path={`${process.env.ZIPKIN_UI_PREFIX}traces/:traceId`} component={TraceContainer}/>
                        <Route component={NotFoundContainer}/>
                    </Switch>
                </Router>
            </IntlProvider>
        );
    }
}

// App entry point.
window.addEventListener("load", () => {
    ReactDOM.render(<App />, document.getElementById("app"));
});
