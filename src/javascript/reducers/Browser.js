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
 * Browser Reducer
 *
 * @Date : 2017-12-10
 * @Description : The reducer for browser details.
 **/

import { Reducer } from 'reduxion';
import Moment from 'moment';

class BrowserReducer extends Reducer {

    constructor(name) {
        super(name, {
            // Browser Filters.
            startTs: Moment().subtract(1, 'days').valueOf(),
            endTs: Moment().valueOf(),
            sortOrder: 'duration-desc',
            annotationQuery: '',
            minDuration: '',
            serviceName: '',
            spanName: '',
            limit: '',
            queryKey: null,
            // Browser state.
            loading: false,
            localTraces: null,
            deletingLocalTraces: {},
            traces: null,
            services: [],
            selectedTrace: null,
            spans: []
        });
    }

    /**
     * Set Browser Filters
     *
     * Description: Sets the current set of browser filters.
     * @param filters {object} // The filters to set.
     */
    setBrowserFilters(filters) {
        this.setState(filters);
    }

    /**
     * Set Traces
     *
     * Description: Sets the current set of traces.
     * @param traces {array} // The traces to set.
     */
    setTraces(traces) {
        this.setState({
            traces: traces
        });
    }

    /**
     * Set Local Traces
     *
     * Description: Sets the current set of local traces.
     * @param traces {array} // The traces to set.
     */
    setLocalTraces(traces) {
        this.setState({
            localTraces: traces
        });
    }

    /**
     * Set Browser Loading State
     *
     * Description: Sets the browser loading state.
     * @param loading {boolean} // True if loading; false otherwise.
     */
    setBrowserLoading(loading) {
        this.setState({
            loading: loading
        });
    }

    /**
     * Upload Local Trace Complete
     *
     * Description: Updates local traces when an upload is complete.
     * @param trace {object} // The trace that was recently uploaded.
     */
    uploadLocalTraceComplete(trace) {
        this.setLocalTraces([ ...this.state.localTraces, trace ]);
    }

    /**
     * Delete Local Trace Begin
     *
     * Description: Updates local traces when a deletion begins.
     * @param traceId {string} // The id of the trace that was recently deleted.
     */
    deleteLocalTraceBegin(traceId) {
        this.setState({
            deletingLocalTraces: Object.assign({}, this.state.deletingLocalTraces, {
                [traceId] : true
            })
        });
    }

    /**
     * Delete Local Trace Complete
     *
     * Description: Updates local traces when a deletion is complete.
     * @param traceId {string} // The id of the trace that was recently deleted.
     */
    deleteLocalTraceComplete(traceId) {
        this.setLocalTraces(this.state.localTraces.filter(t => {
            return t.traceId !== traceId;
        }));
    }

    /**
     * Delete Local Trace Error
     *
     * Description: Updates local traces when a deletion fails.
     * @param traceId {string} // The id of the trace that was recently deleted.
     */
    deleteLocalTraceError(traceId) {
        this.setState({
            deletingLocalTraces: Object.assign({}, this.state.deletingLocalTraces, {
                [traceId] : false
            })
        });
    }

}

export default BrowserReducer;
