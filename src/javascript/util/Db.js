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
 * DB
 *
 * @Date : 2018-01-16
 * @Description : IndexedDB wrapper.
 **/

import Moment from 'moment';

const DB_NAME = "zipkin_client_db";
const DB_VERSION = 1;

class DB {

    /**
     * Open Indexed DB
     *
     * Description: Opens a connection to the indexedDB.
     * @param success {function} // The success callback.
     * @param error {function}   // The error callback.
     */
    static openIndexedDB(success, error) {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = error;
        request.onsuccess = success;
        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore("traces", { keyPath: 'traceId' });
        };
    }

    /**
     * Add Trace
     *
     * Description: Stores a trace.
     * @param trace {object}     // The trace to store.
     * @param success {function} // The success callback.
     * @param error {function}   // The error callback.
     */
    static AddTrace(trace, success, error) {
        DB.openIndexedDB(e => {
            const db = e.target.result;
            const tx = db.transaction(["traces"], "readwrite");
            tx.onerror = error;

            const traces = tx.objectStore("traces");
            const t = {
                upload_date: Moment().unix(),
                traceId: trace[0].traceId,
                spans: trace
            };
            traces.add(t).onsuccess = () => success(t);
            db.close();
        }, error);
    }

    /**
     * Fetch Trace
     *
     * Description: Fetches a trace.
     * @param traceId {string}   // The id of the trace to fetch.
     * @param success {function} // The success callback.
     * @param error {function}   // The error callback.
     */
    static FetchTrace(traceId, success, error) {
        DB.openIndexedDB(e => {
            const db = e.target.result;
            const tx = db.transaction(["traces"]);
            tx.onerror = error;

            const traces = tx.objectStore("traces");
            const getTrace = traces.get(traceId);
            getTrace.onsuccess = () => success(getTrace.result);
            db.close();
        }, error);
    }

    /**
     * Fetch Traces
     *
     * Description: Fetches all traces.
     * @param success {function} // The success callback.
     * @param error {function}   // The error callback.
     */
    static FetchTraces(success, error) {
        DB.openIndexedDB(e => {
            const db = e.target.result;
            const tx = db.transaction(["traces"]);
            tx.onerror = error;

            const traces = tx.objectStore("traces");
            const getTraces = traces.getAll();
            getTraces.onsuccess = () => success(getTraces.result);
            db.close();
        }, error);
    }

    /**
     * Delete Trace
     *
     * Description: Deletes a trace.
     * @param traceId {string}   // The id of the trace to fetch.
     * @param success {function} // The success callback.
     * @param error {function}   // The error callback.
     */
    static DeleteTrace(traceId, success, error) {
        DB.openIndexedDB(e => {
            const db = e.target.result;
            const tx = db.transaction(["traces"], "readwrite");
            tx.onerror = error;

            const traces = tx.objectStore("traces");
            const deleteTrace = traces.delete(traceId);
            deleteTrace.onsuccess = success;
            db.close();
        }, error);
    }

}

export default DB;
