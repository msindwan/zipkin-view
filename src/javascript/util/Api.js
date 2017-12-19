/**
 * Zipkin-ui Api Helper
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-11
 *
 * Description: Zipkin API Wrapper.
 **/

import 'isomorphic-fetch'; // TODO: Replace with XMLHttpRequest

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
        let uri = '/api/v1/traces?';
        uri += `serviceName=${filters.selectedService}`;
        uri += `&spanName=${filters.selectedSpan}`;
        uri += `&lookback=190083615834`;
        uri += `&endTs=1513056278239`;
        uri += `&minDuration=${filters.duration}`;
        uri += `&limit=${filters.limit}`;
        uri += `&annotationQuery=`;
        uri += `&sortOrder=duration-desc`;

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
