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
 * Trace Reducer
 *
 * @Date : 2017-12-10
 * @Description : The reducer for trace details.
 **/

import Zipkin from '../util/Zipkin';
import { Reducer } from 'reduxion';

class TraceReducer extends Reducer {

    constructor(name) {
        super(name, {
            spanToggleState: {},
            selectedTrace: null,
            selectedSpan: null,
            spanLookup: {},
            loading: false,
            spans: null
        });
    }

    /**
     * Set Span Toggle State
     *
     * Description: Sets the toggle state for a span.
     * @param spanId {string} // The id of the span to toggle.
     */
    setSpanToggleState(spanId) {
        let toggleState = this.state.spanToggleState[spanId];
        if (typeof toggleState === 'undefined') {
            toggleState = true;
        }

        toggleState = !toggleState;
        this.setState({
            spanToggleState: Object.assign({}, this.state.spanToggleState, {
                [spanId] : toggleState
            })
        });
    }

    /**
     * Set Selected Span
     *
     * Description: Sets the current span.
     * @param span {object} // The span to set.
     */
    setSelectedSpan(span) {
        this.setState({ selectedSpan : span });
    }

    /**
     * Set Selected Trace
     *
     * Description: Sets the current trace.
     * @param trace {object} // The trace to set.
     */
    setSelectedTrace(trace) {
        this.setState({
            selectedTrace: null,
            spanLookup: {},
            spans: null
        });

        if (trace !== null) {
            const { spanLookup, spans } = Zipkin.BuildHeirarchy(trace);
            this.setState({
                selectedTrace: trace,
                spanLookup: spanLookup,
                spans: spans
            });
        }
    }

    /**
     * Set Trace Loading State
     *
     * Description: Sets the trace loading state.
     * @param loading {boolean} // True if loading; false otherwise.
     */
    setTraceLoading(loading) {
        this.setState({
            loading: loading
        });
    }

}

export default TraceReducer;
