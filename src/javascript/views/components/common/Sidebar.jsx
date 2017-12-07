/**
 * Zipkin-ui Sidebar component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : App Sidebar.
 **/

import { Dropdown, Input, Button } from 'semantic-ui-react'
import React from 'react';

const Sidebar = () => (
    <div className="zk-ui-sidebar">
        <div className="zk-ui-logo">
            <a href="/">Zipkin</a>
        </div>
        <div className="zk-ui-sidebar-wrapper">
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Service</span>
                 <Dropdown
                     placeholder='Select Service'
                     fluid
                     search
                     selection
                     options={[ { key: 'af', value: 'af', text: 'service' }]} />
            </div>
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Span Name</span>
                <Dropdown
                    placeholder='Select Span Name'
                    fluid
                    search
                    selection
                    options={[ { key: 'af', value: 'af', text: 'span' }]} />
            </div>
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Duration</span>
                <Input />
            </div>
            <div className="zk-ui-form-control-container">
                <span className="zk-ui-form-control-label">Limit</span>
                <Input />
            </div>
            <div className="zk-ui-form-control-container">
                <Button primary>Find Traces</Button>
            </div>
        </div>
    </div>
);

export default Sidebar;
