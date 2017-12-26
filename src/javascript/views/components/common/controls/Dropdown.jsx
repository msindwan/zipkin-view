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
 * Dropdown
 *
 * @Date : 2017-12-24
 * @Description : Dropdown Control.
 **/

import React from 'react';

class Dropdown extends React.Component {

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

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    /**
     * Handle Click Outside
     *
     * Description: Handles click events outside of the dropdown.
     * @param e {event} // The event object.
     */
    handleClickOutside(e) {
        if (!this.popover || !this.popover.contains(e.target)) {
            this.setState({ focus: '' });
        }
    }

    /**
     * On Click
     *
     * Description: The handler that's fired when the dropdown is clicked..
     */
    onClick() {
        // Show the dropdown on input focus.
        this.setState({ focus: 'active' });
    }


    /**
     * On Row Clicked
     *
     * Description: The handler that's fired when a dropdown row is clicked.
     * @param option {option} // The dropdown option.
     */
    onRowClicked(e, option) {
        // Update the search text.
        e.stopPropagation();
        this.setState({ value: option.label, focus: '' });
        this.props.onOptionSelected(option);
    }

    render() {
        return (
            <div onClick={e => this.onClick(e)} className={`${this.props.className} zk-ui-dropdown`}>
                <div className="zk-ui-dropdown-container">
                    <div className="zk-ui-button">{this.state.value}</div>
                    <div
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
                                            onClick={e => this.onRowClicked(e, option)}
                                            className="zk-ui-dropdown-row">
                                            { option.label }
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

Dropdown.defaultProps = {
    onOptionSelected: () => {},
    className: '',
    data: [ ]
};

export default Dropdown;
