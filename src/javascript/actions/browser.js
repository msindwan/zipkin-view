/**
 * Browser Actions
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-10
 *
 * Description : Browser actions.
 **/

import API from '../util/Api';
import { Action } from 'reduxion';

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

// Fetches all services.
const GetServices = () => {
    API.fetchServices(services => {
        SetBrowserFilters({ services: services });
    }, error => {
        // TODO: Handle errors.
        alert(error);
    })
};

// Fetches the list of spans for a given service.
const GetSpans = (service) => {
    API.fetchSpans(service, spans => {
        SetBrowserFilters({ spans: spans });
    }, error => {
        // TODO: Handle errors.
        alert(error);
    })
};

const FetchTraces = (filters) => {
    API.fetchTraces(filters, traces => {
        SetTraces(traces);
    }, error => {
        // TODO: Handle errors.
        alert(error);
    })
};

export {
    SetBrowserFilters,
    SetSelectedTrace,
    GetServices,
    FetchTraces,
    SetTraces,
    GetSpans
};
