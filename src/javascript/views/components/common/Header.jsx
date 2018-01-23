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

import { UploadLocalTrace } from '../../../actions/Trace';
import { ToggleSidebar } from '../../../actions/Global';
import Zipkin from '../../../util/Zipkin';
import Utils from '../../../util/Utils';
import { injectIntl } from 'react-intl';
import React from 'react';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchText: '' };
    }

    /**
     * On Search
     *
     * Description: The handler that's fired when a trace ID is submitted in the search.
     */
    onSearch() {
        const searchText = this.state.searchText;
        if (searchText) {
            this.setState({ searchText: '' });
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

    /**
     * Upload Trace
     *
     * Description: The handler that's fired when a trace is uploaded.
     * @param e {event} // The event object.
     */
    onUploadTrace(e) {
        const files = e.target.files;
        if (files.length <= 0) {
            return false;
        }

        const reader = new FileReader();
        const file = files.item(0);
        reader.onload = e => {
            try {
                const spans = JSON.parse(e.target.result);
                Zipkin.ValidateSpans(spans);

                UploadLocalTrace(spans, trace => {
                    this.props.history.push(`/traces/${trace.traceId}?storage=local`);
                });
            } catch(e) {
                // An invalid trace was provided.
                Utils.Alert(this.props.intl.formatMessage({
                    id: 'invalid_trace_upload'
                }, {
                    filename: file.name
                }));
                console.error(e);
            }
        };

        reader.readAsText(file);
    }

    render() {
        return (
            <div className="zk-ui-header">
                <div className="zk-ui-header-button"  onClick={() => ToggleSidebar()}>
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
                <div className="zk-ui-header-button">
                    <input
                        onChange={e => this.onUploadTrace(e)}
                        className="zk-ui-uploader"
                        type="file"
                        accept="text/json" />
                    <i className="fa fa-upload"></i>
                </div>
            </div>
        );
    }

}

export default injectIntl(Header);
