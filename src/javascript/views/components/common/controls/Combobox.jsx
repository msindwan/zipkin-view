/**
 * Zipkin-ui Combobox
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-09
 *
 * Description : Combobox control.
 **/

import React from 'react';

class Combobox extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        // Initial combobox state.
        return {
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

    onFocus(e) {
        // Show the dropdown on input focus.
        this.setState({ focus: 'active' });
    }

    onBlur(e) {
        // Hide the dropdown on input blur.
        e.persist();
        setTimeout(() => {
            this.setState({ focus: '' });
            this.props.onBlur(e);
        }, 250);
    }

    onChange(e) {
        // Filter options by search text.
        this.setState({
            value: e.target.value,
            options: this.props.data.filter(option => {
                return option.indexOf(e.target.value, 0) === 0;
            })
        });
    }

    onDropdownButtonClick(e) {
        // Set input focus to show the dropdown.
        if (this.state.focus === '') {
            this.searchInput.focus();
        }
    }

    onRowClicked(option, e) {
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
                        value={this.state.value}
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
                        { this.state.options.map((option, i) => {
                               return (
                                   <div
                                       key={i}
                                       onClick={e => this.onRowClicked(option, e)}
                                       className="zk-ui-combobox-row">
                                       {option}
                                   </div>
                               );
                        })}
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
