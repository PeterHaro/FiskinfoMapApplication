var FiskInfoUtility = function () {
    "use strict";

    /**
     * Make a X-Domain request to url and callback.
     *
     * @param url {String}
     * @param method {String} HTTP verb ("GET", "POST", "DELETE", etc.)
     * @param data {String} request body
     * @param callback {Function} to callback on completion
     * @param errback {Function} to callback on error
     */
    function corsRequest(url, method, data, callback, errback, authToken) {
        var req;
        var token = null;
        if (authToken !== null) {
            if (typeof authToken !== "undefined") {
                token = authToken;
            }
        }
        if (XMLHttpRequest) {
            req = new XMLHttpRequest();
            if ("withCredentials" in req) {
                req.open(method, url, true);
                req.setRequestHeader("Authorization",
                    "Bearer " + token);
                req.onerror = errback;
                req.onreadystatechange = function () {
                    if (req.readyState === 4) {
                        if (req.status >= 200 && req.status < 400) {
                            callback(req.responseText);
                        } else {
                            errback(new Error("Response returned with non-OK status " + req.status));
                        }
                    }
                };
                req.send(data);
            }
        } else if (XDomainRequest) {
            req = new XDomainRequest();
            req.open(method, url);
            req.onerror = errback;
            req.onload = function () {
                callback(req.responseText);
            };
            req.send(data);
        } else {
            errback(new Error("CORS not supported"));
        }
    }

    function formatDate(date) {
        var monthNames = [
            "Januar", "Februar", "Mars",
            "April", "Mai", "Juni", "Juli",
            "August", "September", "Oktober",
            "November", "Desember"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + '.' + monthNames[monthIndex] + ' ' + year;
    }


    return {
        corsRequest: corsRequest,
        formatDate: formatDate
    }
}();
