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
 * Zipkin-ui Store
 *
 * @Date : 2017-12-10
 * @Description : Main application store.
 **/

import BrowserReducer from './reducers/Browser';
import TraceReducer from './reducers/Trace';
import { Store } from 'reduxion';

// Create the app reducers.
const browserReducer = new BrowserReducer('browser');
const traceReducer = new TraceReducer('trace');

// Create a new store with all of the reducers.
export default new Store(browserReducer, traceReducer);
