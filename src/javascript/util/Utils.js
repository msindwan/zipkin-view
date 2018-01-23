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
 * Util
 *
 * @Date : 2017-12-11
 * @Description : Generic Helper Functions.
 **/

import 'noty/lib/noty.css';
import Noty from 'noty';

class Utils {

    /**
     * URLify
     *
     * Description: Converts an object to a query string.
     * @param object {object} // The object to convert.
     * @returns {string} // The query string.
     */
    static URLify(object) {
        const keys = Object.keys(object).sort();
        if (keys.length === 0) {
            return '';
        }

        let queryString = '?';
        keys.forEach((key, i) => {
            if (typeof object[key] !== 'undefined') {
                queryString += `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`;
                if (i < keys.length - 1) {
                    queryString += '&';
                }
            }
        });

        return queryString;
    }

    /**
     * Get Query Parameters
     *
     * Description: Fetches the query parameters for the current page.
     * @returns {object} // An object with decoded query parameter mappings.
     */
    static GetQueryParams(){
        let lookup,
            params,
            kv,
            i;

        params = window.location.search.substring(1).split("&");
        lookup = {};

        for (i = 0; i < params.length; i++) {
            kv = params[i].split("=");
            if (kv[1]) {
                lookup[kv[0]] = decodeURIComponent(kv[1]);
            }
        }

        return lookup;
    }

    /**
     * Is Object
     *
     * Description: Checks if the provided argument is an object.
     * @param o {object} // The argument to type-check.
     * @returns {boolean} // True if o is an object; false otherwise.
     */
    static isObject(o) {
        return o instanceof Object && o.constructor === Object;
    }

    /**
     * Is String
     *
     * Description: Checks if the provided argument is a string.
     * @param s {object} // The argument to type-check.
     * @returns {boolean} // True if s is a string; false otherwise.
     */
    static isString(s) {
        return typeof s === 'string' || s instanceof String;
    }

    /**
     * Alert
     *
     * Description: Creates a noty alert.
     * @param text {string} // The notification text.
     * @param type {string} // The notification type.
     * @param timeout {int} // The timeout for the notification.
     */
    static Alert(text, type='error', timeout=7500) {
        new Noty({
            type: type,
            timeout: timeout,
            text: text
        }).show();
    }


    /**
     * Fetch JSON
     *
     * Description: Sends a GET request to the specified URL and returns the JSON response.
     * @param url {string}       // The resource URL.
     * @param success {function} // The success callback.
     * @param failure {function} // The failure callback.
     */
    static FetchJSON(url, success, failure) {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    success(JSON.parse(xhr.responseText));
                } else {
                    failure(new Error(xhr.statusText));
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.send();
    }
}

export default Utils;
