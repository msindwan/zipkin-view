/**
 * Zipkin-ui Util
 *
 * @Author : Mayank Sindwani
 * @Date   : 2017-12-11
 *
 * Description: Generic Helper Functions.
 **/

class Utils {

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

}

export default Utils;
