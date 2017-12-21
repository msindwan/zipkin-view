/**
 * Trace Reducer
 *
 * @Author : Mayank Sindwani
 * @Date   :2017-12-10
 *
 * Description : The reducer for trace details.
 **/

import { Reducer } from 'reduxion';

class TraceReducer extends Reducer {

    constructor(name) {
        super(name, {
            selectedTrace: null,
            loading: false,
        });
    }

    setSelectedTrace(trace) {
        this.setState({
            selectedTrace: trace
        });
    }

    setTraceLoading(loading) {
        this.setState({
            loading: loading
        });
    }

}

export default TraceReducer;
