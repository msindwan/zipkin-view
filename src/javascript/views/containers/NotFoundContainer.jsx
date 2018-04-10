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

import { FormattedMessage } from 'react-intl';
import React from 'react';

const NotFoundContainer = () => (
    <div className="container">
        <div className="error-container">
            <div className="code">
                <FormattedMessage
                    id="not_found_code" />
            </div>
            <div className="message">
                <FormattedMessage
                    id="not_found_message" />
            </div>
            <a href={`${process.env.ZIPKIN_UI_PREFIX}`}>
                <FormattedMessage
                    id="not_found_go_back_message" />
            </a>
        </div>
    </div>
);

export default NotFoundContainer;
