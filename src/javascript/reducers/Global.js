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
 * Global Reducer
 *
 * @Date : 2017-12-24
 * @Description : The reducer for generic app details.
 **/

import { Reducer } from 'reduxion';

class GlobalReducer extends Reducer {

    constructor(name) {
        super(name, {
            configLoading: false,
            sidebarVisible: false,
            storage: 'remote',
            config: null
        });
    }

    /**
     * Set Config Loading
     *
     * Description: Sets the flag to indicate if the config is loading.
     * @param configLoading {boolean} // The toggle to set.
     */
    setConfigLoading(configLoading) {
        this.setState({
            configLoading: configLoading
        });
    }

    /**
     * Set Config
     *
     * Description: Sets the config for the application.
     * @param config {object} // The config to set.
     */
    setConfig(config) {
        this.setState({
            config: config
        });
    }

    /**
     * Toggle Sidebar
     *
     * Description: Sets the state of the sidebar visibility.
     * @param toggle {boolean | optional} // The toggle to set.
     */
    toggleSidebar(toggle = !this.state.sidebarVisible) {
        this.setState({
            sidebarVisible: toggle
        });
    }

    /**
     * Set Storage
     *
     * Description: Sets the storage target for the application.
     * @param storage {string} // The storage param to set.
     */
    setStorage(storage) {
        this.setState({
            storage: storage
        });
    }

}

export default GlobalReducer;
