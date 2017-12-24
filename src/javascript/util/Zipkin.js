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
 * Zipkin Util
 *
 * @Date : 2017-12-11
 * @Description : Zipkin Helper Functions.
 **/

import Moment from 'moment';

class Zipkin {

    /**
     * Get Trace Duration
     *
     * Description: Gets the duration for a trace.
     * @param trace {object} // The trace object.
     * @returns {int}        // The duration in seconds.
     */
    static GetTraceDuration(trace) {
        // TODO: Find out if the root span is sufficient.
        return trace[0].duration/1000000;
    }

    /**
     * Get Trace Service
     *
     * Description: Gets the top-level service for a trace.
     * @param trace {object} // The trace object.
     * @returns {string}     // The service name.
     */
    static GetTraceService(trace) {
        return Zipkin.GetSpanService(trace[0]);
    }

    /**
     * Get Trace Name
     *
     * Description: Gets the top-level service for a trace.
     * @param trace {object} // The trace object.
     * @returns {string}     // The service name.
     */
    static GetTraceName(trace) {
        return trace[0].name;
    }

    /**
     * Get Trace ID
     *
     * Description: Gets the ID for a trace.
     * @param trace {object} // The trace object.
     * @returns {string}     // The trace ID.
     */
    static GetTraceID(trace) {
        return trace[0].traceId;
    }

    /**
     * Get Trace Span Count
     *
     * Description: Gets the span count for a trace.
     * @param trace {object} // The trace object.
     * @returns {int}        // The trace span count.
     */
    static GetTraceSpanCount(trace) {
        return trace.length;
    }

    /**
     * Get Trace Date
     *
     * Description: Gets the date when the trace was collected.
     * @param trace {object} // The trace object.
     * @returns {string}     // The date formatted as a string relative to now.
     */
    static GetTraceDate(trace) {
        return Moment(trace[0].timestamp/1000).fromNow();
    }

    /**
     * Get Span Service
     *
     * Description: Gets the service name for a given span.
     * @param span {object} // The span object.
     * @returns {string}    // The service name.
     */
    static GetSpanService(span) {
        return span.annotations[0].endpoint.serviceName;
    }

    /**
     * Duration to String
     *
     * Description: Converts a duration property from a span to a string.
     * @param duration {int} // The duration in micro seconds.
     * @returns {string}     // The duration as a string.
     */
    static DurationToString(duration) {
        // TODO: Format this with other units if applicable.
        return `${duration/1000000}s`;
    }

    /**
     * Convert timestamp to date
     *
     * Description: Converts a span timestamp to a date formatted as a string.
     * @param timestamp {int} // The timestamp for a span.
     * @returns {string}      // The date formatted as a string.
     */
    static ConvertTimestampToDate(timestamp) {
        return Moment(timestamp/1000).format('MM/DD/YYYY, LTS');
    }

}

export default Zipkin;
