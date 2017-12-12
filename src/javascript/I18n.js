/**
 * Zipkin-ui i18n
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-07
 *
 * Description : App i18n instance and translations.
 **/
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';

i18n
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translations: {
                    "Service": "Service",
                    "Span Name": "Span Name",
                    "Date Time Range": "Date Time Range",
                    "Duration": "Duration",
                    "Limit": "Limit",
                    "Find Traces": "Find Traces",
                    "Trace ID": "Trace ID",
                    "Start Time": "Start Time",
                    "End Time": "End Time",
                    "Apply": "Apply"
                }
            }
        },
        fallbackLng: 'en',
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            wait: true
        }
    });

export default i18n;
