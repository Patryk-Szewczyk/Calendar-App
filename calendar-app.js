var Layout_DESKTOP = /** @class */ (function () {
    function Layout_DESKTOP() {
    }
    Layout_DESKTOP.prototype.setMenuButton_AEL = function () {
        var menuButton = document.querySelector('svg.menu-arrow');
        var isShow = false;
        menuButton.addEventListener('click', function () {
            var sidebar = document.querySelector('nav.nav-menu');
            switch (isShow) {
                case false:
                    {
                        isShow = true;
                        setTimeout(function () {
                            sidebar.style.left = '0px';
                            menuButton.style.transform = 'rotateZ(0deg)';
                            sidebar.style.transitionDuration = '0.5s';
                        }, 1);
                    }
                    break;
                case true:
                    {
                        isShow = false;
                        setTimeout(function () {
                            sidebar.style.left = '-250px';
                            menuButton.style.transform = 'rotateZ(180deg)';
                            sidebar.style.transitionDuration = '0.5s';
                        }, 1);
                    }
                    break;
            }
        }, false);
    };
    return Layout_DESKTOP;
}());
;
// MEGA WAŻNE!
// Chociaż klasa "Layout" może działać bez konstruktora, to w przypadku,
// gdy jest ona używana wewnątrz innej klasy (takiej jak klasa App),
// konstruktor jest potrzebny.
var Layout = /** @class */ (function () {
    function Layout() {
    }
    Layout.prototype.setAppBody_AEL = function () {
        var appBody_EL = document.querySelector('div.app-body');
        ['load', 'resize'].forEach(function (ev) {
            addEventListener(ev, function () {
                appBody_EL.style.height = window.innerHeight + 'px';
            }, false);
        });
    };
    Layout.prototype.setLayout_DESKTOP = function () {
        var layout_DESKTOP = new Layout_DESKTOP();
        layout_DESKTOP.setMenuButton_AEL();
    };
    return Layout;
}());
;
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.Main = function () {
        var layout = new Layout();
        layout.setAppBody_AEL();
        layout.setLayout_DESKTOP();
    };
    return App;
}());
;
var app = new App();
app.Main();
