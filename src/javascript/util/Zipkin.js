/**
 * Zipkin-ui Zipkin
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-11
 *
 * Description: Zipkin Helper Functions.
 **/

import Moment from 'moment';

class Zipkin {

    static getTraceDuration(trace) {
        // TODO: Find out if the root span is sufficient.
        return trace[0].duration/1000000;
    }

    static durationToString(duration) {
        return `${duration/1000000}s`;
    }

    static getTraceName(trace) {
        return trace[0].name;
    }

    static getTraceSpanCount(trace) {
        return trace.length;
    }

    static getTraceDate(trace) {
        return Moment(trace[0].timestamp/1000).fromNow();
    }

    static convertTimestampToDate(timestamp) {
        return Moment(timestamp/1000).format('MM/DD/YYYY, LTS');
    }

}

export default Zipkin;
