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
 * Header
 *
 * @Date : 2017-12-07
 * @Description : App Header.
 **/

import { ToggleSidebar } from '../../../actions/Global';
import { injectIntl } from 'react-intl';
import React from 'react';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    /**
     * On Search
     *
     * Description: The handler that's fired when a trace ID is submitted in the search.
     */
    onSearch() {
        const searchText = this.state.searchText;
        if (searchText) {
            this.setState({ searchText: ''});
            this.props.history.push(`/traces/${searchText}`);
        }
    }

    /**
     * On Key Press
     *
     * Description: The handler that's fired when a key is pressed in the search input.
     * @param e {event} // The event object.
     */
    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSearch();
        }
    }

    render() {
        return (
            <div className="zk-ui-header">
                <div className="zk-ui-sidebar-toggle"  onClick={() => ToggleSidebar()}>
                    <i className="fa fa-navicon"></i>
                </div>
                <div className="zk-ui-trace-search">
                    <input
                        onKeyPress={e => this.onKeyPress(e)}
                        value={this.state.searchText}
                        onChange={e => this.setState({ searchText : e.target.value })}
                        className="zk-ui-input"
                        placeholder={this.props.intl.formatMessage({ id : 'trace_id_label' })} />
                    <i onClick={() => this.onSearch()} className="fa fa-search"></i>
                </div>
            </div>
        );
    }

}

export default injectIntl(Header);
