/**
 * Zipkin-ui Intl
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-16
 *
 * Description : App translations.
 **/

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';

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

    constructor() {
        addLocaleData([...en]);
    }

    GetLocale() {
        const locale = navigator.language;
        if (typeof translations[locale] === 'undefined') {
            return 'en';
        }
        return locale;
    }

    GetTranslations() {
        return translations[this.GetLocale()];
    };

}

export default new Intl();
