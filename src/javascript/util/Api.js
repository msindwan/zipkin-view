/**
 * Zipkin-ui Api Helper
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-11
 *
 * Description: Zipkin API Wrapper.
 **/

import 'isomorphic-fetch';

class API {

    static fetchServices(success, failure) {
        fetch("http://localhost:9411/zipkin/api/v1/services").then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Invalid content-type");
        })
        .then(success)
        .catch(failure);
    }

    static fetchSpans(service, success, failure) {
        if (service == '') {
            service = 'all';
        }

        const uri = `http://localhost:9411/zipkin/api/v1/spans?serviceName=${service}`;
        fetch(uri).then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Invalid content-type");
        })
        .then(success)
        .catch(failure);
    }

    static fetchTraces(filters, success, failure) {
        let uri = 'http://localhost:9411/zipkin/api/v1/traces?';
        uri += `serviceName=${filters.selectedService}`;
        uri += `&spanName=${filters.selectedSpan}`;
        uri += `&lookback=190083615834`;
        uri += `&endTs=1513056278239`;
        uri += `&minDuration=${filters.duration}`;
        uri += `&limit=${filters.limit}`;
        uri += `&annotationQuery=`;
        uri += `&sortOrder=duration-desc`;

        fetch(uri).then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Invalid content-type");
        })
        .then(success)
        .catch(failure);
    }

}

export default API;
