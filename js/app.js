(function () {
    function App(name) {
        this.model = new app.Model(name);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
        this.router = new app.Router(this.controller);
    }
    var App = new App("fbPgSearchApp");
    App.router.init();
}());