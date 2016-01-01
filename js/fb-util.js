/*************************************************
 * Module to access Facebook API's.
 ***************************************************/
(function(window) {
    var fb_util = window.fb_util || {},
        FB = window.FB || {},
        counter = 0;
        FB.ACCESSTOKEN = "CAACEdEose0cBAMU4MqU5D1jl9oEcJ9mPQfYZAttzGN2zPeApZAcnEuN1Tcqnxz06FO62pec63VoX8RgjZAW1ZALWEQ3fRnr0l4xISZCM2VBIDBatURGxCNvvuchR9r7ioRZBOFyxahlC1Ua4OtHxA224lZAmrH4Bm7El8rTWgf3tFyX3RpXwTA743frNZCvY2gAGuFFlmZCHjpAZDZD";

    fb_util = {
        searchPages: function(searchQuery, callback, context) {
            var callbackName = "fbCallback" + (++counter);
            var searchUrl = "https://graph.facebook.com/search?q=" + searchQuery + "&type=page&fields=id,name,picture,category&access_token=" + FB.ACCESSTOKEN + "&callback=" + callbackName;
            
            this.injectScript(searchUrl, callbackName, callback, context);
        },
        injectScript: function(searchUrl, callbackName, callback, context) {
            window[callbackName] = function(data) {
                //Invoke callback function and send result data
                callback.apply(context, [data]);

                //Delete callback from window and delete newly created script tag in head
                delete window[callbackName];
                window.document.querySelector('#' + callbackName).remove();
            };

            //Append script tag with search url to download data
            var head = window.document.querySelector('head');
            var script = window.document.createElement('script');
            script.src = searchUrl;
            script.id = callbackName;
            head.appendChild(script);
        }
    };

    window.fb_util = fb_util;
    window.FB = FB;
}(window));