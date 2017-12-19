/**
 * Browser Actions
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-10
 *
 * Description : Browser actions.
 **/

import { Action } from 'reduxion';
import API from '../util/Api';
import 'noty/lib/noty.css';
import Noty from 'noty';

// Stores browser filters.
const SetBrowserFilters = Action("setBrowserFilters", filters => {
    return filters;
});

// Stores traces.
const SetTraces = Action("setTraces", traces => {
    return traces;
});

// Set the selected trace.
const SetSelectedTrace = Action("setSelectedTrace", trace => {
    return trace;
});

// Toggles the loading state.
const SetBrowserLoading = Action("setBrowserLoading", toggle => {
    return toggle;
});

// Fetches all services.
const GetServices = () => {
    API.fetchServices(services => {
        SetBrowserFilters({ services: services });
    }, error => {
        new Noty({
            type: 'error',
            timeout: 7500,
            text: error.toString()
        }).show();
    });
};

// Fetches the list of spans for a given service.
const GetSpans = (service) => {
    API.fetchSpans(service, spans => {
        SetBrowserFilters({ spans: spans });
    }, error => {
        new Noty({
            type: 'error',
            timeout: 7500,
            text: error.toString()
        }).show();
    });
};

const GetTraces = (filters) => {
    SetBrowserLoading(true);
    API.fetchTraces(filters, traces => {
        SetTraces(traces);
        SetBrowserLoading(false);
    }, error => {
        new Noty({
            type: 'error',
            timeout: 7500,
            text: error.toString()
        }).show();
        SetBrowserLoading(false);
    });
};

const GetTrace = (traceId) => {
    SetBrowserLoading(true);
    setTimeout(function() {
        API.fetchTrace(traceId, trace => {
            SetSelectedTrace(trace);
            SetBrowserLoading(false);
        }, error => {
            new Noty({
                type: 'error',
                timeout: 7500,
                text: error.toString()
            }).show();
            SetBrowserLoading(false);
        });
    }, 1000);
};

export {
    SetBrowserFilters,
    SetSelectedTrace,
    GetServices,
    GetTraces,
    SetTraces,
    GetTrace,
    GetSpans
};
