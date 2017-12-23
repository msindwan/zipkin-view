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
 * Zipkin-ui Intl
 *
 * @Date : 2017-12-16
 * @Description : App translations.
 **/

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import Moment from 'moment';

const translations = {
    'en': {
        service_label: 'Service',
        span_label: 'Span Name',
        sr: 'Server Receive',
        ss: 'Server Send',
        cr: 'Client Receive',
        cs: 'Client Send',
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
