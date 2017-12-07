/**
 * Zipkin-ui NotFoundContainer
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : Application 404 container.
 **/

import React from 'react';

const NotFoundContainer = () => (
    <div className="container">
        <div className="error-container">
            <div className="code">404</div>
            <div className="message">The requested resource was not found</div>
        </div>
    </div>
);

export default NotFoundContainer;
