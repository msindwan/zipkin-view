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
 * Combobox
 *
 * @Date : 2017-12-09
 * @Description : Combobox Control.
 **/

import React from 'react';

class Combobox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: '',
            value: this.props.value,
            options: this.props.data
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data || nextProps.value !== this.state.value) {
            // Update the state with the new props.
            this.setState({
                options: nextProps.data,
                value: nextProps.value
            });
        }
    }

    /**
     * On Focus
     *
     * Description: The handler that's fired when the input is focused on.
     */
    onFocus() {
        // Show the dropdown on input focus.
        this.setState({ focus: 'active' });
    }

    /**
     * On Blur
     *
     * Description: The handler that's fired when the input is blurred.
     * @param e {event} // The event object.
     */
    onBlur(e) {
        // Hide the dropdown on input blur.
        e.persist();
        setTimeout(() => {
            this.setState({ focus: '' });
            this.props.onBlur(e);
        }, 250);
    }

    /**
     * On Change
     *
     * Description: The handler that's fired when the input is changed.
     * @param e {event} // The event object.
     */
    onChange(e) {
        // Filter options by search text.
        this.setState({
            value: e.target.value,
            options: this.props.data.filter(option => {
                return option.indexOf(e.target.value, 0) === 0;
            })
        });
    }

    /**
     * On Dropdown Button Click
     *
     * Description: The handler that's fired when the dropdown button is clicked.
     */
    onDropdownButtonClick() {
        // Set input focus to show the dropdown.
        if (this.state.focus === '') {
            this.searchInput.focus();
        }
    }

    /**
     * On Row Clicked
     *
     * Description: The handler that's fired when a dropdown row is clicked.
     * @param option {option} // The dropdown option.
     */
    onRowClicked(option) {
        // Update the search text.
        this.setState({ value: option });
    }

    render() {
        return (
            <div className="zk-ui-combobox">
                <div className="zk-ui-combobox-container">
                    <input
                        placeholder={this.props.placeholder}
                        ref={(input) => { this.searchInput = input; }}
                        value={this.state.value || ''}
                        onFocus={e => this.onFocus(e)}
                        onBlur={e => this.onBlur(e)}
                        onChange={e => this.onChange(e)}
                        className="zk-ui-input dark" />
                    <div
                        onClick={e => this.onDropdownButtonClick(e)}
                        className="zk-ui-dropdown-button">
                        <div className="zk-ui-arrow-down"></div>
                    </div>
                </div>
                { this.state.options.length > 0 && (
                    <div className={`zk-ui-popover-container ${this.state.focus}`}>
                        <div className="zk-ui-arrow-up"></div>
                        <div className="zk-ui-popover-content">
                            {
                                this.state.options.map((option, i) => {
                                    return (
                                        <div
                                            key={i}
                                            onClick={e => this.onRowClicked(option, e)}
                                            className="zk-ui-combobox-row">
                                            { option }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Combobox.defaultProps = {
    onBlur: () => {},
    data: []
};

export default Combobox;
