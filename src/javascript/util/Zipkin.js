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
import Utils from './Utils';

class Zipkin {

    /**
     * Validate Spans
     *
     * Description: Validates a list of spans.
     * @param spans {array} // The collection of spans.
     * @throws {Error}      // If one or more spans are invalid.
     */
    static ValidateSpans(spans) {
        if (!Array.isArray(spans)) {
            throw new Error("Invalid or no spans; expected an array.");
        }
        spans.forEach(span => Zipkin.ValidateSpan(span));
    }

    /**
     * Validate Span
     *
     * Description: Validates a span against the Zipkin schema (currently v1 only).
     * @param span {object} // The span to validate.
     * @throws {Error}      // If the span is invalid.
     */
    static ValidateSpan(span) {
        if (!Utils.isObject(span)) {
            throw new Error("One or more spans is not an object.");
        }
        if (!Utils.isString(span.id)) {
            throw new Error("Invalid or no span.id; expected a string.");
        }
        if (isNaN(span.duration)) {
            throw new Error("Invalid or no span.duration; expected a string.");
        }
        if (!Utils.isString(span.name)) {
            throw new Error("Invalid or no span.name; expected a string.");
        }
        if (isNaN(span.timestamp)) {
            throw new Error("Invalid or no span.timestamp; expected a string.");
        }
    }

    /**
     * Build Heirarchy
     *
     * Description: Builds the tree hierarchy for a trace.
     * @param trace {trace} // The trace object.
     * @returns {array}     // the tree for the trace.
     * @throws {Error}      // If one or more spans are invalid.
     */
    static BuildHeirarchy(trace) {
        const spanLookup = {};
        const spans = [];
        let broken = false;

        // Build the lookup.
        trace.spans.forEach(span => {
            Zipkin.ValidateSpan(span);
            spanLookup[span.id] = span;
            span._meta_ = {
                children : [],
                depth: null,
                orphan: false
            };
        });

        // Associate children.
        trace.spans.forEach(span => {
            const parent = spanLookup[span.parentId];
            if (typeof parent !== 'undefined') {
                parent._meta_.children.unshift(span);
            } else {
                if (span.parentId) {
                    span._meta_.orphan = true;
                    broken = true;
                }
                spans.push(span);
            }
        });

        // Sort spans by timestamp from latest to earliest.
        spans.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });

        return {
            spanLookup,
            spans,
            broken
        };
    }

    /**
     * Get Root Span
     *
     * Description: Returns the root span for a trace.
     * @param trace {trace} // The trace object.
     * @returns {object}    // The root span.
     */
    static GetRootSpan(trace) {
        // For efficiency, we assume that the span with the earliest timestamp
        // is the root span.
        return trace.spans[trace.spans.length - 1];
    }

    /**
     * Get Trace Duration
     *
     * Description: Gets the duration for a trace.
     * @param trace {object} // The trace object.
     * @returns {int}        // The duration.
     */
    static GetTraceDuration(trace) {
        return Zipkin.GetRootSpan(trace).duration;
    }

    /**
     * Get Trace Service
     *
     * Description: Gets the top-level service for a trace.
     * @param trace {object} // The trace object.
     * @returns {string}     // The service name.
     */
    static GetTraceService(trace) {
        return Zipkin.GetSpanService(Zipkin.GetRootSpan(trace));
    }

    /**
     * Get Trace Name
     *
     * Description: Gets the top-level service for a trace.
     * @param trace {object} // The trace object.
     * @returns {string}     // The service name.
     */
    static GetTraceName(trace) {
        return Zipkin.GetRootSpan(trace).name;
    }

    /**
     * Get Trace Span Count
     *
     * Description: Gets the span count for a trace.
     * @param trace {object} // The trace object.
     * @returns {int}        // The trace span count.
     */
    static GetTraceSpanCount(trace) {
        return trace.spans.length;
    }

    /**
     * Get Trace Date
     *
     * Description: Gets the date when the trace was collected.
     * @param trace {object} // The trace object.
     * @returns {string}     // The date formatted as a string relative to now.
     */
    static GetTraceDate(trace) {
        return Moment(Zipkin.GetTraceTimestamp(trace)/1000).fromNow();
    }

    /**
     * Get Trace Timestamp
     *
     * Description: Gets the timestamp for the trace.
     * @param trace {object} // The trace object.
     * @returns {int}        // The timestamp in milliseconds.
     */
    static GetTraceTimestamp(trace) {
        return Zipkin.GetRootSpan(trace).timestamp;
    }

    /**
     * Get Span Service
     *
     * Description: Gets the service name for a given span.
     * @param span {object} // The span object.
     * @returns {string}    // The service name.
     */
    static GetSpanService(span) {
        let endpoint;

        if (typeof span.annotations !== 'undefined') {
            endpoint = span.annotations[0].endpoint;
        } else if (typeof span.binaryAnnotations !== 'undefined') {
            endpoint =  span.binaryAnnotations[0].endpoint;
        }

        if (typeof endpoint !== 'undefined') {
            return endpoint.serviceName;
        }

        return null;
    }

    /**
     * Duration to String
     *
     * Description: Converts a duration property from a span to a string.
     * @param duration {int} // The duration in micro seconds.
     * @returns {string}     // The duration as a string.
     */
    static DurationToString(duration, intl) {
        const units = [
            [ 1000000, 'duration_seconds' ],
            [ 1000, 'duration_milliseconds' ],
            [ 1, 'duration_microseconds' ]
        ];

        for (let i = 0; i < units.length; i++) {
            const base = units[i][0];
            const translation = units[i][1];
            const convertedDuration = duration/base;

            if (convertedDuration > 1 || i == units.length - 1) {
                return intl.formatMessage({
                    id: translation,
                }, {
                    duration: intl.formatNumber(convertedDuration)
                });
            }
        }

        throw new Error("Invalid duration");
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
