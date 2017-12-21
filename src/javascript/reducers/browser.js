/**
 * Browser Reducer
 *
 * @Author : Mayank Sindwani
 * @Date   :2017-12-10
 *
 * Description : The reducer for browser details.
 **/

import { Reducer } from 'reduxion';
import Moment from 'moment';

class BrowserReducer extends Reducer {

    constructor(name) {
        super(name, {
            serviceName: '',
            spanName: '',
            endTs: Moment().valueOf(),
            startTs: Moment().subtract(1, 'days').valueOf(),
            minDuration: '',
            limit: '',
            annotationQuery: '',
            sortOrder: 'duration-desc',
            selectedTrace: null,
            services: [],
            traces: null,
            spans: [],
            loading: false,
            dateFrom: null,
            dateTo: null
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

    setBrowserLoading(loading) {
        this.setState({
            loading: loading
        });
    }

}

export default BrowserReducer;
