/**
 * Zipkin-ui Header component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : App Header.
 **/

import { GetTrace } from '../../../actions/Browser';
import React from 'react';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    onSearch(e) {
        if (this.state.searchText) {
            GetTrace(this.state.searchText);
        }
    }

    render() {
        return (
            <div className="zk-ui-header">
                <div className="zk-ui-trace-search">
                    <input
                        value={this.state.searchText}
                        onChange={e => this.setState({ searchText : e.target.value })}
                        className="zk-ui-input" placeholder={'Trace ID'} />
                    <i onClick={e => this.onSearch(e)} className="fa fa-search"></i>
                </div>
            </div>
        );
    }

}

export default Header;
