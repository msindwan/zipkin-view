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

import { SetStorage } from './Global';
import { Action } from 'reduxion';
import Utils from '../util/Utils';
import API from '../util/Api';
import DB from '../util/Db';

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
 * Set Span Toggle State Action
 *
 * Description: Sets the toggle state for a span.
 * @param spanId {string} // The id of the span to toggle.
 */
const SetSpanToggleState = Action("setSpanToggleState", spanId => {
    return spanId;
});

/**
 * Set Selected Span Action
 *
 * Description: Sets the current span.
 * @param span {object} // The span to set.
 */
const SetSelectedSpan = Action("setSelectedSpan", span => {
    return span;
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
    SetStorage('remote');

    API.FetchTrace(traceId, trace => {
        SetSelectedTrace(trace);
        SetTraceLoading(false);
    }, error => {
        Utils.Alert(error.toString());
        SetTraceLoading(false);
    });
};

/**
 * Get Local Trace Action
 *
 * Description: Fetches the specified trace from local storage.
 * @param traceId {string} // The ID of the trace to fetch.
 */
const GetLocalTrace = (traceId, intl) => {
    SetTraceLoading(true);
    SetSelectedTrace(null);
    SetStorage('local');

    DB.FetchTrace(traceId, trace => {
        if (!trace) {
            Utils.Alert(intl.formatMessage({
                id: 'trace_not_found'
            }, {
                traceId: traceId
            }));
        } else {
            SetSelectedTrace(trace);
        }
        SetTraceLoading(false);
    }, error => {
        Utils.Alert(error.toString());
        SetTraceLoading(false);
    });
};

/**
 * Upload Local Trace
 *
 * Description: Saves a trace to client-side storage.
 * @param trace {object}                // The trace to upload.
 * @param success {function | optional} // The success callback.
 * @param error {function | optional}   // The error callback.
 */
const UploadLocalTrace = (trace, success, error) => {
    Action("uploadLocalTraceBegin", trace => trace)(trace);
    DB.AddTrace(trace, t => {
        if (success) success(t);
        Action("uploadLocalTraceComplete", trace => trace)(t);
    }, e => {
        Utils.Alert(e.toString());
        if (error) error(e);
        Action("uploadLocalTraceError", trace => trace)(e);
    });
};

/**
 * Delete Local Trace
 *
 * Description: Deletes a trace from client-side storage.
 * @param traceId {string}              // The id of trace to delete.
 * @param success {function | optional} // The success callback.
 * @param error {function | optional}   // The error callback.
 */
const DeleteLocalTrace = (traceId, success, error) => {
    Action("deleteLocalTraceBegin", traceId => traceId)(traceId);
    DB.DeleteTrace(traceId, () => {
        if (success) success();
        Action("deleteLocalTraceComplete", traceId => traceId)(traceId);
    }, e => {
        Utils.Alert(e.toString());
        if (error) error(e);
        Action("deleteLocalTraceError", traceId => traceId)(traceId);
    });
};

export {
    SetSpanToggleState,
    SetSelectedTrace,
    UploadLocalTrace,
    DeleteLocalTrace,
    SetSelectedSpan,
    GetLocalTrace,
    GetTrace
};
