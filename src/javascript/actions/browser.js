/**
 * Browser Actions
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-10
 *
 * Description : Browser actions.
 **/

import API from '../util/ApiHelper';
import { Action } from 'reduxion';

// Stores browser filters.
const SetBrowserFilters = Action("setBrowserFilters", filters => {
    return filters;
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
    // TODO
};

export {
    SetBrowserFilters,
    GetServices,
    GetSpans
};
