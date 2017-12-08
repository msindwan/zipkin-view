/**
 * Zipkin-ui Browser component
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Trace Browser.
 **/

import React from 'react';

const Browser = () => (
    <div className="zk-ui-browser">
        <div className="zk-ui-browser-container">
            <div className="zk-ui-browser-card">
                <div className="zk-ui-browser-card-header"></div>
                <div className="zk-ui-browser-card-content">
                    <img
                        alt="OpenZipkin logo"
                        src="https://zipkin.io/public/img/zipkin-logo-200x119.jpg"
                        className="zk-ui-browser-card-content-placeholder" />
                </div>
            </div>
        </div>
    </div>
);

export default Browser;
