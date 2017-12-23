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
 * Zipkin-ui Api Helper
 *
 * @Date : 2017-12-11
 * @Description : Zipkin API Wrapper.
 **/

import Utils from './Utils';
import 'isomorphic-fetch';

class API {

    /**
     * Fetch Services
     *
     * Description: Fetches all services.
     * @param success {function} // The success callback.
     * @param failure {function} // The failure callback.
     */
    static FetchServices(success, failure) {
        fetch("/api/v1/services")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch services (error code ${response.status})`);
                }
                return response.json();
            })
            .then(success)
            .catch(failure);
    }

    /**
     * Fetch Spans
     *
     * Description: Fetches all spans for a given service.
     * @param service {string}   // The service name.
     * @param success {function} // The success callback.
     * @param failure {function} // The failure callback.
     */
    static FetchSpans(service, success, failure) {
        fetch(`/api/v1/spans?serviceName=${service}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch spans (error code ${response.status})`);
                }
                return response.json();
            })
            .then(success)
            .catch(failure);
    }

    /**
     * Fetch Traces
     *
     * Description: Fetches all traces with the specified set of filters.
     * @param filters {object}   // The filters.
     * @param success {function} // The success callback.
     * @param failure {function} // The failure callback.
     */
    static FetchTraces(filters, success, failure) {
        const query = {
            ...filters,
            lookback: filters['endTs'] - filters['startTs'],
            annotationQuery: filters['annotationQuery'].replace(/(?:\r\n|\r|\n)/g, '')
        };

        fetch(`/api/v1/traces${Utils.URLify(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch traces (error code ${response.status})`);
                }
                return response.json();
            })
            .then(success)
            .catch(failure);
    }

    /**
     * Fetch Trace
     *
     * Description: Fetches the trace with the specified trace ID.
     * @param trace   {string}   // The trace ID.
     * @param success {function} // The success callback.
     * @param failure {function} // The failure callback.
     */
    static FetchTrace(trace, success, failure) {
        fetch(`/api/v1/trace/${trace}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error(`Failed to fetch trace (error code ${response.status})`);
                }
                return response.json();
            })
            .then(success)
            .catch(failure);
    }
}

export default API;
