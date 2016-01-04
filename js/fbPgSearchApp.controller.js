(function (window) {
    function Controller(model, view) {
        this.model = model;
        this.view = view;
        
        this.view.bind("submitSearch", this._handleSearchSubmit.bind(this));
        this.view.bind("favouritesHeaderPress", this._handleFavouritesHeaderPress.bind(this));
        this.view.bind("resultsHeaderPress", this._handleResultsHeaderPress.bind(this));
        this.view.bind("favouriteIconPress", this._handleFavouriteIconPress.bind(this));
        this.view.bind("removeIconPress", this._handleRemoveIconPress.bind(this));
    }
    
    Controller.prototype.setHomeView = function () {
        this.view.highlightHeader(this.view.RESULTS_PAGE_TYPE);
    };
    
    Controller.prototype.setFavouritesView = function () {
        this.view.highlightHeader(this.view.FAVOURITES_PAGE_TYPE);
        var self = this;
        this.model.findAll(function (aPages) {
            self.view.showPageList(aPages, self.view.FAVOURITES_PAGE_TYPE);
        });
    };
    
    Controller.prototype.setSearchResultsView = function (sQuery) {
        this.view.setSearchInput(sQuery);
        if (this.sCurrentQuery === sQuery) {
            this._handleSearchResults(this.oCachedPageList);
        } else {
            fb_util.searchPages(sQuery, this._handleSearchResults, this);
            this.sCurrentQuery = sQuery;
        }
    };
    
    Controller.prototype._handleSearchResults = function (oData) {
        this.oCachedPageList = oData;
        var self = this,
            data = oData.data,
            nDataCounter = 0;
        
        self.model.findAll(function (aFavouritePages) {
            data.forEach(function (page) {
                page.isFavourite = aFavouritePages.some(function (oFavouritePage) {
                    return oFavouritePage.id === page.id;
                });
            });
            data = data.sort(function (page1, page2) {
                return page2.category < page1.category ? 1 : -1;
            });
            self.view.showPageList(data, self.view.RESULTS_PAGE_TYPE);
        });
    };
    
    Controller.prototype._handleSearchSubmit = function (sQuery, bForceRedirect) {
        this.view.highlightHeader(this.view.RESULTS_PAGE_TYPE);
        if (sQuery.length || bForceRedirect) {
            window.location.hash = "search?q=" + sQuery;
        }
    };
    
    Controller.prototype._handleFavouritesHeaderPress = function () {
        window.location.hash = "favourites";
    };
    
    Controller.prototype._handleResultsHeaderPress = function () {
        var sQuery = this.view.getQueryString();
        this._handleSearchSubmit(sQuery, true);
    };
    
    Controller.prototype._handleFavouriteIconPress = function (id, isFavourite) {
        if (!isFavourite) {
            var page = this.oCachedPageList.data.filter(function (page) {
                return page.id === id;
            })[0];
            this.model.add(page, function () {
                console.log(page.name, " marked as favourite");
            });
        } else {
            this.model.remove(id, function () {
                console.log(id, " removed from favourites");
            });
        }
        this.view.toggleFavouriteState(id);
    };
    
    Controller.prototype._handleRemoveIconPress = function (id) {
        var self = this;
        this.model.remove(id, function () {
            console.log(id, " removed from favourites");
            self.view.removePageListItem(id);
        });
    };
    
    window.app = window.app || {};
    window.app.Controller = Controller;
}(window));