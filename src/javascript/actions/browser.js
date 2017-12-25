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
 * Browser Actions
 *
 * @Date : 2017-12-10
 * @Description : Browser Actions.
 **/

import { Action } from 'reduxion';
import Utils from '../util/Utils';
import API from '../util/Api';

/**
 * Set Browser Filters Action
 *
 * Description: Dispatches browser filters.
 * @param filters {object} // The filters to store.
 * @returns {object} // The filters for the reducer to set.
 */
const SetBrowserFilters = Action("setBrowserFilters", filters => {
    return filters;
});

/**
 * Set Browser Loading Action
 *
 * Description: Toggles the browser loading state.
 * @param toggle {boolean} // True if the browser is loading; false otherwise.
 * @returns {boolean} // The toggle for the reducer to set.
 */
const SetBrowserLoading = Action("setBrowserLoading", toggle => {
    return toggle;
});

/**
 * Set Traces Action
 *
 * Description: Dispatches the list of traces.
 * @param traces {array} // The traces to store.
 * @returns {array} // The traces for the reducer to set.
 */
const SetTraces = Action("setTraces", traces => {
    return traces;
});

/**
 * Get Services
 *
 * Description: Fetches the list of services.
 */
const GetServices = () => {
    API.FetchServices(services => {
        SetBrowserFilters({ services: services });
    }, error => {
        Utils.Alert(error.toString());
    });
};

/**
 * Get Spans
 *
 * Description: Fetches the list of span names for a service.
 * @param service {string} // The service name to fetch spans for.
 */
const GetSpans = (service) => {
    API.FetchSpans(service, spans => {
        SetBrowserFilters({ spans: spans });
    }, error => {
        Utils.Alert(error.toString());
    });
};

/**
 * Get Traces
 *
 * Description: Fetches traces with the specified filters.
 * @param filters {object} // The filters to apply to the search for traces.
 */
const GetTraces = (filters) => {
    SetBrowserLoading(true);
    API.FetchTraces(filters, traces => {
        SetTraces(traces);
        SetBrowserLoading(false);
    }, error => {
        Utils.Alert(error.toString());
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
