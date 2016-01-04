(function (window) {
    function Template() {
        var favIcon =
            '<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 24 24" class="favourite-icon favourite-state-{{isFavourite}}" style="display: block;"><g id="favorite"><path d="M12,21.4L10.6,20C5.4,15.4,2,12.3,2,8.5C2,5.4,4.4,3,7.5,3c1.7,0,3.4,0.8,4.5,2.1C13.1,3.8,14.8,3,16.5,3C19.6,3,22,5.4,22,8.5c0,3.8-3.4,6.9-8.6,11.5L12,21.4z"></path></g></svg>';
         var removeIcon =
            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="20" class="remove-icon"  width="20" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" class="remove-icon"><g><path d="M139.506,440.542c0.461,11.01,9.521,19.699,20.539,19.699h191.91c11.019,0,20.078-8.689,20.54-19.699l13.704-289.316H125.801L139.506,440.542z M299.413,223.087c0-4.61,3.738-8.349,8.349-8.349h13.356c4.61,0,8.349,3.738,8.349,8.349V388.38c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.737-8.349-8.349V223.087z M240.974,223.087c0-4.61,3.738-8.349,8.349-8.349h13.355c4.61,0,8.349,3.738,8.349,8.349V388.38c0,4.611-3.738,8.349-8.349,8.349h-13.355c-4.61,0-8.349-3.737-8.349-8.349V223.087z M182.533,223.087c0-4.61,3.738-8.349,8.349-8.349h13.356c4.61,0,8.349,3.738,8.349,8.349V388.38c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.737-8.349-8.349V223.087z"/><path d="M395.325,72.801H306.79V56.063c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737h-88.536c-7.125,0-12.9,5.776-12.9,12.901v40.527h304.451V85.702C408.226,78.577,402.45,72.801,395.325,72.801z"/></g></svg>';
      
        this.emptyFavouritesMessage =
            '<div class="default-message">' +
                '<span class="default-message">No Favourites Saved.</span>' +
            '</div>';
        this.sEmptySearchResultsMessage =
            '<div class="default-message">' +
                '<span class="default-message">No Results Found</span>' +
            '</div>';
        this.pageSearchResultsListItemTemplate =
             '<div class="list-item-box" data-id="{{id}}" data-is-favourite="{{isFavourite}}">' +
                    '<div class="col-sm">' +
                            '<img src="{{image}}">' +
                    '</div>' +
                    '<div class="col-md"> ' + 
                            '<div id="name">{{name}}</div>' +
                            '<div id="category">{{category}}</div>' +
                            '<span class="details">Show Details</span>' +
                    '</div>'+                    
                    '<div class="col-sm-right">' +
                    favIcon +
                    '</div>' +
            '</div>';
        this.favouritePageListItemTemplate = 
            '<div class="list-item-box" data-id="{{id}}" data-is-favourite="{{isFavourite}}">' +
                    '<div class="col-sm">' +
                            '<img src="{{image}}">' +
                    '</div>' +
                    '<div class="col-md"> ' + 
                            '<div id="name">{{name}}</div>' +
                            '<div id="category">{{category}}</div>' +
                            '<span class="details">Show Details</span>' +
                    '</div>'+                    
                    '<div class="col-sm-right">' +
                    removeIcon +
                    '</div>' +
            '</div>';
    }
    
    Template.prototype.getEmptyFavouritesMessage = function () {
        return this.emptyFavouritesMessage;
    };
    
    Template.prototype.getEmptySearchResultsMessage = function () {
        return this.sEmptySearchResultsMessage;
    };
    
    Template.prototype.getSearchResultsPageList = function (data) {
        var sView = "",
            self = this;
        data.forEach(function (oData) {
            var template = self.pageSearchResultsListItemTemplate;
            template = template.replace("{{id}}", oData.id);
            template = template.replace(/\{\{isFavourite\}\}/g, oData.isFavourite);
            template = template.replace("{{name}}", oData.name);
            template = template.replace("{{category}}", oData.category);
            template = template.replace("{{image}}", oData.picture.data.url);
            sView = sView + template;
        });
        return sView;
    };
    
    Template.prototype.getFavouritePageList = function (data) {
        var sView = "",
            self = this;
        data.forEach(function (oData) {
            if(oData){
                var template = self.favouritePageListItemTemplate;
                template = template.replace("{{id}}", oData.id);
                template = template.replace("{{name}}", oData.name);
                template = template.replace("{{category}}", oData.category);
                template = template.replace("{{image}}", oData.picture.data.url);
                sView = sView + template;
            }
        });
        return sView;
    };
    
    window.app = window.app || {};
    window.app.Template = Template;
}(window));