/**
 * Trace Actions
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-10
 *
 * Description : Trace actions.
 **/

import { Action } from 'reduxion';
import API from '../util/Api';
import 'noty/lib/noty.css';
import Noty from 'noty';

// Set the selected trace.
const SetSelectedTrace = Action("setSelectedTrace", trace => {
    return trace;
});

// Toggles the loading state.
const SetTraceLoading = Action("setTraceLoading", toggle => {
    return toggle;
});

// Fetches a single trace.
const GetTrace = (traceId) => {
    SetTraceLoading(true);
    SetSelectedTrace(null);

    API.fetchTrace(traceId, trace => {
        SetSelectedTrace(trace);
        SetTraceLoading(false);
    }, error => {
        new Noty({
            type: 'error',
            timeout: 7500,
            text: error.toString()
        }).show();
        SetTraceLoading(false);
    });
};

export {
    SetSelectedTrace,
    GetTrace
};
