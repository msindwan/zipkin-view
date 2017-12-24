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
 * NotFoundContainer
 *
 * @Date : 2017-12-07
 * @Description : Application 404 Container.
 **/

import React from 'react';

const NotFoundContainer = () => (
    <div className="container">
        <div className="error-container">
            <div className="code">404</div>
            <div className="message">The requested resource was not found</div>
            <a href="/">Click to go back to the homepage</a>
        </div>
    </div>
);

export default NotFoundContainer;
