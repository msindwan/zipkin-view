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
            startTs: Moment().subtract(1, 'days').valueOf(),
            endTs: Moment().valueOf(),
            sortOrder: 'duration-desc',
            selectedTrace: null,
            annotationQuery: '',
            minDuration: '',
            serviceName: '',
            loading: false,
            dateFrom: null,
            services: [],
            traces: null,
            dateTo: null,
            spanName: '',
            limit: '',
            spans: []
        });
    }

    /**
     * Set Browser Filters
     *
     * Description: Sets the current set of browser filters.
     * @param trace {object} // The filters to set.
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

}

export default BrowserReducer;
