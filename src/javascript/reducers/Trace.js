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

import { Reducer } from 'reduxion';

class TraceReducer extends Reducer {

    constructor(name) {
        super(name, {
            selectedTrace: null,
            loading: false,
        });
    }

    /**
     * Set Selected Trace
     *
     * Description: Sets the current trace.
     * @param trace {object} // The trace to set.
     */
    setSelectedTrace(trace) {
        this.setState({
            selectedTrace: trace
        });
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
