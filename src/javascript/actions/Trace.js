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
 * Trace Actions
 *
 * @Date : 2017-12-10
 * @Description : Trace Actions.
 **/

import { Action } from 'reduxion';
import Utils from '../util/Utils';
import API from '../util/Api';

/**
 * Set Selected Trace Action
 *
 * Description: Dispatches the current trace.
 * @param trace {object} // The trace to store.
 * @returns {object} The trace for the reducer to set.
 */
const SetSelectedTrace = Action("setSelectedTrace", trace => {
    return trace;
});

/**
 * Set Trace Loading Action
 *
 * Description: Toggles the loading state for the trace.
 * @param toggle {boolean} // True if the trace is loading; false otherwise.
 * @returns {boolean} The toggle for the reducer to set.
 */
const SetTraceLoading = Action("setTraceLoading", toggle => {
    return toggle;
});

/**
 * Get Trace Action
 *
 * Description: Fetches the specified trace.
 * @param traceId {string} // The ID of the trace to fetch.
 */
const GetTrace = (traceId) => {
    SetTraceLoading(true);
    SetSelectedTrace(null);

    API.FetchTrace(traceId, trace => {
        SetSelectedTrace(trace);
        SetTraceLoading(false);
    }, error => {
        Utils.Alert(error.toString());
        SetTraceLoading(false);
    });
};

export {
    SetSelectedTrace,
    GetTrace
};
