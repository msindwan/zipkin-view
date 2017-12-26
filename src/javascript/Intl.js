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
 * Intl
 *
 * @Date : 2017-12-16
 * @Description : App translations.
 **/

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import Moment from 'moment';

const translations = {
    'en': {
        address_label: 'Address',
        all_placeholder_label: 'All',
        annotation_label: 'Annotation',
        annotations_label: 'Annotations',
        annotations_placeholder_label: "(e.g. 'http.path=/foo/bar/ and cache.miss ...')",
        apply_label: 'Apply',
        back_label: 'Back',
        cr: 'Client Receive',
        cs: 'Client Send',
        date_time_label: 'Date Time',
        date_time_range_label: 'Date Time Range',
        'duration-asc': 'Sort by Shortest Duration',
        'duration-desc': 'Sort by Longest Duration',
        'timestamp-asc': 'Sort by Newest',
        'timestamp-desc': 'Sort by Oldest',
        duration_label: 'Duration',
        duration_seconds: '{duration}s',
        end_date_label: 'End Date',
        end_time_label: 'End Time',
        find_traces_label: 'Find Traces',
        hour_placeholder: 'HH',
        key_label: 'Key',
        limit_label: 'Limit',
        minute_placeholder: 'MM',
        not_found_code: '404',
        not_found_go_back_message: 'Click to go back to the homepage',
        not_found_message: 'The requested resource was not found',
        no_traces_found_placeholder_label: 'No Traces Found',
        parent_id_label: 'Parent ID',
        relative_time_label: 'Relative Time',
        search_for_traces_placeholder_label: "Search for Traces",
        service_label: 'Service',
        span_count: '{count} spans',
        span_label: 'Span Name',
        sr: 'Server Receive',
        ss: 'Server Send',
        span_id_label: 'Span ID',
        start_date_label: 'Start Date',
        start_time_label: 'Start Time',
        timestamp_label: 'Timestamp',
        trace_id_label: 'Trace ID',
        value_label: 'Value',
        wr: 'Wire Receive',
        ws: 'Wire Send'
    }
};

class Intl {

    constructor(locale) {
        // Add locale data and define translations.
        addLocaleData([...en]);

        // Set the current locale.
        this.setLocale(locale);
    }

    /**
     * Get Locale
     *
     * Description: Returns the current locale.
     * @returns {string} // The current locale.
     */
    getLocale() {
        return this.locale;
    }

    /**
     * Set Locale
     *
     * Description: Sets the current locale.
     * @param locale {string} // The locale to set.
     */
    setLocale(locale) {
        if (typeof translations[locale] === 'undefined') {
            console.warn(`${locale} not supported. Defaulting to en.`);
            this.locale = 'en';
        } else {
            this.locale = locale;
        }

        // Set the moment locale.
        Moment.locale(this.locale);
    }

    /**
     * Get translations
     *
     * Description: Returns the translations for the current locale.
     * @returns {object} // The translations.
     */
    getTranslations() {
        return translations[this.locale];
    }

}

export default Intl;
