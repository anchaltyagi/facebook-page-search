/*************************************************
 * Module to access local storage.
 ***************************************************/
(function(window) {
    //Constructor function for Model
    function Model(storageName, callback) {
        callback = callback || function() {};
        this._storeName = storageName;
        //Create empty data if no data in storage
        if (!localStorage[storageName]) {
            var data = {
                pages: []
            };
            localStorage[storageName] = JSON.stringify(data);
        }

        callback.call(this, JSON.parse(localStorage[storageName]));
    }

    Model.prototype.find = function(id, callback) {
        if (!callback) {
            return;
        }
        var data = JSON.parse(localStorage[this._storeName]);
        var pages = data.pages;
        var i;
        //Find  page with given id from storage
        for (i = 0; i < pages.length; i++) {
            if (pages[i].id === id) {
                 callback.call(this, JSON.parse(pages[i]));
            }
        }       
    };

    Model.prototype.findAll = function(callback) {
        callback = callback || function() {};
        callback.call(this, JSON.parse(localStorage[this._storeName]).pages);
    };

    Model.prototype.add = function(pageData, callback) {
        var data = JSON.parse(localStorage[this._storeName]);
        var pages = data.pages;
        callback = callback || function() {};

        //Add page to local storage pages array and update in localstorage
        pages.push(pageData);
        localStorage[this._storeName] = JSON.stringify(data);
        callback.call(this, JSON.parse(localStorage[this._storeName]).pages);
    };

    Model.prototype.remove = function(id, callback) {
        var data = JSON.parse(localStorage[this._storeName]);
        var pages = data.pages;
        var i;
        //Find and remove page woth given id from storage
        for (i = 0; i < pages.length; i++) {
            if (pages[i].id === id) {
                pages.splice(i, 1);
                break;
            }
        }

        //Update local storage with new data
        localStorage[this._storeName] = JSON.stringify(data);
        callback.call(this, JSON.parse(localStorage[this._storeName]).pages);
    };

    window.app = window.app || {};
    window.app.Model = Model;
}(window));