/*************************************************
 * Module to access Facebook API's.
 ***************************************************/
(function(window) {
    var fb_util = window.fb_util || {},
        FB = window.FB || {},
        counter = 0;
        FB.ACCESSTOKEN = "CAACEdEose0cBANM7AWjf2tttizYRYQPkDQZAzvWn1GipruHFch5lpMGeY9YxMySxlcRb9m685WLpljr8JTb5iqi0XNxaiLR3VCiZCknt8B41av5BBtSNM1q20vnkABYJnrwEszZB23FORlOZAl93wPUaFUVwpaUKsffGMdkAJxU2pvr9CVZBHsjB6qPBheu1XR6kAVJW4pwZDZD";

    fb_util = {
        searchPages: function(searchQuery, callback, context) {
            var callbackName = "fbCallback" + (++counter);
            var searchUrl = "https://graph.facebook.com/search?q=" + searchQuery + "&type=user&fields=id,name,picture&access_token=" + FB.ACCESSTOKEN + "&callback=" + callbackName;
            
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