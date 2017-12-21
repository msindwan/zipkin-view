/**
 * Zipkin-ui Api Helper
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-11
 *
 * Description: Zipkin API Wrapper.
 **/

import 'isomorphic-fetch'; // TODO: Replace with XMLHttpRequest
import Utils from './Utils';

class API {

    static fetchServices(success, failure) {
        fetch("/api/v1/services").then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch services (error code ${response.status})`);
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Failed to fetch services (invalid content-type)");
        })
        .then(success)
        .catch(failure);
    }

    static fetchSpans(service, success, failure) {
        if (service == '') {
            service = 'all';
        }

        const uri = `/api/v1/spans?serviceName=${service}`;
        fetch(uri).then(response => {
            if(!response.ok) {
                throw new Error(`Failed to fetch spans (error code ${response.status})`);
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Failed to fetch services (invalid content-type)");
        })
        .then(success)
        .catch(failure);
    }

    static fetchTraces(filters, success, failure) {
        const query = {
            ...filters,
            lookback: filters['endTs'] - filters['startTs']
        };

        if (typeof query['annotationQuery'] !== 'undefined') {
            query['annotationQuery'] = query['annotationQuery'].replace(/(?:\r\n|\r|\n)/g, '');
        }

        const uri = `/api/v1/traces${Utils.URLify(query)}`;

        fetch(uri).then(response => {
            if(!response.ok) {
                throw new Error(`Failed to fetch traces (error code ${response.status})`);
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Failed to fetch services (invalid content-type)");
        })
        .then(success)
        .catch(failure);
    }

    static fetchTrace(trace, success, failure) {
        const uri = `/api/v1/trace/${trace}`;
        fetch(uri).then(response => {
            if(!response.ok) {
                throw new Error(`Failed to fetch trace (error code ${response.status})`);
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Failed to fetch services (invalid content-type)");
        })
        .then(success)
        .catch(failure);
    }
}

export default API;
