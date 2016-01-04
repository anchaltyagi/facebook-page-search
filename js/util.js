(function () {
    var Utils = window.Utils || {};
    Utils = {
        getUrlParams : function (sLocationHash) {
            var urlParams = {},
                match,
                pl     = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query  = sLocationHash.substring(1);

            urlParams = {};
            while (match = search.exec(query)) {
                urlParams[decode(match[1])] = decode(match[2]);
            }
            return urlParams;
        }
    };
    
    window.Utils = Utils;
}());