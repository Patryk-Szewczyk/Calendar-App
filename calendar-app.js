var Layout_DESKTOP = /** @class */ (function () {
    function Layout_DESKTOP() {
    }
    Layout_DESKTOP.prototype.setMenuButton_AEL = function () {
        var menuButton_EL = document.querySelector('svg.dsk-menu-arrow');
        var isShow = false;
        menuButton_EL.addEventListener('click', function () {
            var sidebar = document.querySelector('nav.dsk-nav-menu');
            switch (isShow) {
                case false:
                    {
                        isShow = true;
                        setTimeout(function () {
                            sidebar.style.left = '0px';
                            menuButton_EL.style.transform = 'rotateZ(0deg)';
                            sidebar.style.transitionDuration = '0.5s';
                        }, 1);
                    }
                    break;
                case true:
                    {
                        isShow = false;
                        setTimeout(function () {
                            sidebar.style.left = '-250px';
                            menuButton_EL.style.transform = 'rotateZ(180deg)';
                            sidebar.style.transitionDuration = '0.5s';
                        }, 1);
                    }
                    break;
            }
        }, false);
    };
    Layout_DESKTOP.prototype.setContentCalendarBox_Width_AEL = function () {
        var _this = this;
        var sidebar_LEFT = -250;
        var sidebar_LEFT_PRP = 0;
        ['load', 'resize'].forEach(function (ev) {
            window.addEventListener(ev, function () {
                sidebar_LEFT = document.querySelector('nav.dsk-nav-menu').getBoundingClientRect().left;
                sidebar_LEFT_PRP = (sidebar_LEFT === -250) ? 0 : 250;
                var time = '0.0s';
                _this.setContentCalendarBox_Width_FNC(sidebar_LEFT_PRP, time);
            }, false);
        });
        var menuButton_EL = document.querySelector('svg.dsk-menu-arrow');
        menuButton_EL.addEventListener('click', function () {
            sidebar_LEFT = document.querySelector('nav.dsk-nav-menu').getBoundingClientRect().left;
            sidebar_LEFT_PRP = (sidebar_LEFT === -250) ? 250 : 0;
            var time = '0.5s';
            _this.setContentCalendarBox_Width_FNC(sidebar_LEFT_PRP, time);
        }, false);
    };
    Layout_DESKTOP.prototype.setContentCalendarBox_Width_FNC = function (sidebar_LEFT_PRP, time) {
        var calenContBox_EL = document.querySelector('div.dsk-calendar-box');
        var questBox_WIDTH = document.querySelector('div.dsk-quest-box').getBoundingClientRect().width;
        var result_WIDTH = (window.innerWidth - questBox_WIDTH - sidebar_LEFT_PRP);
        calenContBox_EL.style.width = result_WIDTH + 'px';
        calenContBox_EL.style.transitionDuration = time;
        /*console.log('window.innerWidth: ' + window.innerWidth + ' | questBox_WIDTH: ' + questBox_WIDTH + ' | sidebar_LEFT_PRP: ' + sidebar_LEFT_PRP);
        console.log('result: ' + result_WIDTH);
        console.log('sidebar_LEFT: ' + sidebar_LEFT);*/
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
    Layout.prototype.setAppBody_Height_AEL = function () {
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
        layout_DESKTOP.setContentCalendarBox_Width_AEL();
    };
    return Layout;
}());
;
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.Main = function () {
        var layout = new Layout();
        layout.setAppBody_Height_AEL();
        layout.setLayout_DESKTOP();
    };
    return App;
}());
;
var app = new App();
app.Main();
