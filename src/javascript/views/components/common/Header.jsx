/**
 * Zipkin-ui Header component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : App Header.
 **/

import React from 'react';

const Header = ({ i18n }) => (
    <div className="zk-ui-header">
        <div className="zk-ui-trace-search">
            <input className="zk-ui-input" placeholder={i18n('Trace ID')} />
            <i className="fa fa-search"></i>
        </div>
    </div>
);

export default Header;
