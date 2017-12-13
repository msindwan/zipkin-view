/**
 * Zipkin-ui Combobox
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-09
 *
 * Description : Combobox control.
 **/

import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        // Initial combobox state.
        return {
            width: '100%'
        };
    }

    onFocus(e) {
        this.setState({
            width: '500px'
        });
    }

    onBlur(e) {
        this.setState({
            width: '100%'
        })
    }

    render() {
        return (
            <input
                style={{ width: this.state.width }}
                className="zk-ui-input dark"
                onFocus={e => this.onFocus(e)}
                onBlur={e => this.onBlur(e)} />
        );
    }
}

export default Input;
