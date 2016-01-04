(function (window) {
    function View(oTemplate) {
        this.oTemplate = oTemplate;
        /* Constants */
        this.ENTER_KEYCODE = 13;
        this.RESULTS_PAGE_TYPE = "search-results";
        this.FAVOURITES_PAGE_TYPE = "favourites";
        
        /* DOM References */
        this.$dynamicView = window.document.querySelector(".item-container");
        this.$searchInput = window.document.querySelector("input.search-input");
        this.$searchButton = window.document.querySelector("div#button-holder");
        this.$searchResultsHeader = window.document.querySelector(".tabrow li:first-child");
        this.$favouritesHeader = window.document.querySelector(".tabrow li:last-child");
    }
    
     
    View.prototype.highlightHeader = function (headerName) {
        switch (headerName) {
        case this.RESULTS_PAGE_TYPE:
            this.$favouritesHeader.classList.remove("selected");
            this.$searchResultsHeader.classList.add("selected");
            break;
        case this.FAVOURITES_PAGE_TYPE:
            this.$searchResultsHeader.classList.remove("selected");
            this.$favouritesHeader.classList.add("selected");
            break;
        default:
            break;
        }
    };
    
    View.prototype.setSearchInput = function (query) {
        this.$searchInput.value = query;
    };
    
    View.prototype.showPageList = function (aData, sPageType) {
        if (aData && aData.length) {
            var sPageList;
            if (sPageType === this.FAVOURITES_PAGE_TYPE) {
                sPageList = this.oTemplate.getFavouritePageList(aData);
            } else if (sPageType === this.RESULTS_PAGE_TYPE) {
                sPageList = this.oTemplate.getSearchResultsPageList(aData);
            }
            this.$dynamicView.innerHTML = sPageList;
        } else {
            if (sPageType === this.FAVOURITES_PAGE_TYPE) {
                var sEmptyFavouritesMessage = this.oTemplate.getEmptyFavouritesMessage();
                this.$dynamicView.innerHTML = sEmptyFavouritesMessage;
            } else if (sPageType === this.RESULTS_PAGE_TYPE) {
                var sEmptySearchResultsMessage = this.oTemplate.getEmptySearchResultsMessage();
                this.$dynamicView.innerHTML = sEmptySearchResultsMessage;
            }
        }
        
    };
    
    View.prototype.getQueryString = function () {
        return this.$searchInput.value;
    };
    
    View.prototype.toggleFavouriteState = function (id) {
        var $favouriteStateIcon = window.document.querySelector("[data-id='" + id + "'] .favourite-icon");
        if ($favouriteStateIcon.classList.contains("favourite-state-true")) {
            $favouriteStateIcon.classList.remove("favourite-state-true");
            $favouriteStateIcon.classList.add("favourite-state-false");
            $favouriteStateIcon.parentElement.dataset.isFavourite = "false";
        } else {
            $favouriteStateIcon.classList.remove("favourite-state-false");
            $favouriteStateIcon.classList.add("favourite-state-true");
            $favouriteStateIcon.parentElement.dataset.isFavourite = "true";
        }
    };
    
    View.prototype.removePageListItem = function (id) {
        var $pageListItem = window.document.querySelector("[data-id='" + id + "']");
        $pageListItem.remove();
    };
    
    View.prototype.bind = function (event, fnHandler) {
        var self = this;
        switch (event) {
        case "submitSearch":
            this.$searchButton.addEventListener("click", function () {
                var sQuery = self.$searchInput.value.trim();
                fnHandler(sQuery);
            });
            this.$searchInput.addEventListener("keypress", function (event) {
                if (event.keyCode === self.ENTER_KEYCODE) {
                    var sQuery = self.$searchInput.value.trim();
                    fnHandler(sQuery);
                }
            });
            break;
        case "favouritesHeaderPress":
            this.$favouritesHeader.addEventListener("click", function () {
                fnHandler();
            });
            break;
        case "resultsHeaderPress":
            this.$searchResultsHeader.addEventListener("click", function () {
                fnHandler();
            });
            break;
        case "favouriteIconPress":
            this.$dynamicView.addEventListener("click", function (event) {
                var svg = event.target.parentElement && event.target.parentElement.parentElement;
                if (svg && svg.classList.contains("favourite-icon")) {
                    fnHandler(svg.parentElement.parentElement.dataset.id, svg.parentElement.parentElement.dataset.isFavourite === "true");
                }
            });
            break;
        case "removeIconPress":
            this.$dynamicView.addEventListener("click", function (event) {
                var svg = event.target.parentElement && event.target.parentElement.parentElement;
                if (svg && svg.classList.contains("remove-icon")) {
                    fnHandler(svg.parentElement.parentElement.dataset.id);
                }
            });
            break;
        }
    };
    
    window.app = window.app || {};
    window.app.View = View;
}(window));