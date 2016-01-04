
(function () {
    function Router(controller) {
        this.controller = controller;
    }
    Router.prototype.init = function () {
        window.onload = this.setView.bind(this);
        window.onhashchange = this.setView.bind(this);
    };
    
    //Set view based on windows hash location
    Router.prototype.setView = function () {
        var urlParams = Utils.getUrlParams(window.location.hash),
            urlState = Object.keys(urlParams)[0];
        if (!urlState) {
            //If no state is set, go to home view
            window.location.hash = "";
            this.controller.setHomeView();
        } else if (urlState.search("search") !== -1) {
            //If state is in search for pages, go to search result view
            if (urlParams[urlState] && urlParams[urlState].length) {
                this.controller.setSearchResultsView(urlParams[urlState]);
            } else {
                window.location.hash = "";
                this.controller.setHomeView();
            }
        } else if (urlState.search("favourites") !== -1) {
            //If state is in favourites pages, go to favourites view
            this.controller.setFavouritesView();
        } else {
            window.location.hash = "";
            this.controller.setHomeView();
        }
    };
    
    window.app = window.app || {};
    window.app.Router = Router;
}(window));