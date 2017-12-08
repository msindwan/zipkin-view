/**
 * Zipkin-ui Sidebar component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : App Sidebar.
 **/

import React from 'react';

const Sidebar = () => (
    <div className="zk-ui-sidebar">
        <div className="zk-ui-logo">
            <a href="/">Zipkin</a>
        </div>
        <div className="zk-ui-sidebar-wrapper">
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Service</span>
                <input className="zk-ui-input dark" />
            </div>
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Span Name</span>
                <input className="zk-ui-input dark" />
            </div>
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Start Date</span>
                <input className="zk-ui-input dark" />
            </div>
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">End Date</span>
                <input className="zk-ui-input dark" />
            </div>
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Duration</span>
                <input className="zk-ui-input dark" />
            </div>
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Limit</span>
                <input className="zk-ui-input dark" />
            </div>
            <div className="zk-ui-form-control-container">
                <button className="zk-ui-button primary">Find Traces</button>
            </div>
        </div>
    </div>
);

export default Sidebar;
