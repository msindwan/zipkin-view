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
 * Container
 *
 * @Date : 2017-12-31
 * @Description : Abstract Container.
 **/

import AppStore from '../../Store';
import React from 'react';

class AbstractContainer extends React.Component {

    constructor(props) {
        super(props);
        if (this === AbstractContainer) {
            throw new TypeError("Cannot instantiate Abstract container.");
        }
        this.state = AppStore.getState();
        this.onStoreUpdate = this.onStoreUpdate.bind(this);
    }

    componentDidMount() {
        // Subscribe to the store and update the state on change.
        AppStore.subscribe(this.onStoreUpdate);
        this.loadStateFromHistory();
    }

    componentWillUnmount() {
        AppStore.unsubscribe(this.onStoreUpdate);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.loadStateFromHistory();
        }
    }

    /**
     * On Store Update
     *
     * Description: Handles app store updates.
     * @param store {object} // The application store.
     */
    onStoreUpdate(_, store) {
        this.setState(store);
    }

    /**
     * Load State from History
     *
     * Description: Loads the state from the current location.
     */
    loadStateFromHistory() {
        throw new TypeError("loadStateFromHistory method not implemented.");
    }
}

export default AbstractContainer;
