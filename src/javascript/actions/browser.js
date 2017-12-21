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

// Fetches all of the traces for a given set of filters.
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

export {
    SetBrowserFilters,
    GetServices,
    GetTraces,
    SetTraces,
    GetSpans
};
