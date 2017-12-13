/**
 * Zipkin-ui Store
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-10
 *
 * Description: Main application store.
 **/

import BrowserReducer from './reducers/Browser';
import { Store } from 'reduxion';

// Create the app reducers.
const browserReducer = new BrowserReducer('browser');

// Create a new store with all of the reducers.
export default new Store(browserReducer);
