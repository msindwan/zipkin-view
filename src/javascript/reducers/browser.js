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
            selectedSpan: '',
            duration: null,
            services: [],
            limit: null,
            spans: []
        });
    }

    // Updates the state with new filters.
    setBrowserFilters(filters) {
        this.setState(filters);
    }

}

export default BrowserReducer;
