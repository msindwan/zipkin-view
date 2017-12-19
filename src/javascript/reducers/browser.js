/**
 * Browser Reducer
 *
 * @Author : Mayank Sindwani
 * @Date   :2017-12-10
 *
 * Description : The reducer for browser details.
 **/

import { Reducer } from 'reduxion';

class BrowserReducer extends Reducer {

    constructor(name) {
        super(name, {
            selectedService: '',
            selectedTrace: null,
            selectedSpan: '',
            duration: '',
            services: [],
            traces: null,
            limit: '',
            spans: [],
            loading: false
        });
    }

    // Updates the state with new filters.
    setBrowserFilters(filters) {
        this.setState(filters);
    }

    setTraces(traces) {
        this.setState({
            traces: traces
        });
    }

    setSelectedTrace(trace) {
        this.setState({
            selectedTrace: trace
        });
    }

    setBrowserLoading(loading) {
        this.setState({
            loading: loading
        });
    }

}

export default BrowserReducer;
