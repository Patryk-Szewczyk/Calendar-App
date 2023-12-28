var Functions = /** @class */ (function () {
    function Functions() {
    }
    Functions.prototype.setInitialGlobalVariables = function () {
        this.counterYear = new Date().getFullYear();
        this.counterMonth = new Date().getMonth();
        this.counterDay = new Date().getDate();
        this.getMonthDays(this.counterYear, this.counterMonth);
        var month_AR = ['Styczeń ', 'Luty ', 'Marzec ', 'Kwiecień ', 'Maj ', 'Czerwiec ', 'Lipiec ', 'Sierpień ', 'Wrzesień ', 'Październik ', 'Listopad ', 'Grudzień '];
        var qb_title_EL = document.querySelector('div.qb-title');
        qb_title_EL.textContent = month_AR[(new Date().getMonth())] + new Date().getDate() + ', ' + new Date().getFullYear();
    };
    Functions.prototype.getFullData = function () {
        var data = new Date();
    };
    Functions.prototype.navArrow_Next = function () {
        var _this = this;
        var navArrowNext = document.querySelector('div.ty-next-arrow');
        var ty_value__EL = document.querySelector('div.ty-value');
        ['click', 'touchend'].forEach(function (ev) {
            navArrowNext.addEventListener(ev, function () {
                _this.counterYear += 1;
                ty_value__EL.textContent = String(_this.counterYear);
                _this.getMonthDays(_this.counterYear, _this.counterMonth);
            }, false);
        });
    };
    Functions.prototype.navArrow_Prev = function () {
        var _this = this;
        var navArrowPrev = document.querySelector('div.ty-prev-arrow');
        var ty_value__EL = document.querySelector('div.ty-value');
        ['click', 'touchend'].forEach(function (ev) {
            navArrowPrev.addEventListener(ev, function () {
                if (_this.counterYear > new Date().getFullYear()) {
                    _this.counterYear += -1;
                    _this.getMonthDays(_this.counterYear, _this.counterMonth);
                    ty_value__EL.textContent = String(_this.counterYear);
                }
            }, false);
        });
    };
    Functions.prototype.buttonsMonth = function () {
        var _this = this;
        var buttonMonth_AR = document.querySelectorAll('div.mb-item');
        console.log(buttonMonth_AR);
        var cb_title_EL = document.querySelector('div.cb-title');
        var month_AR = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        var _loop_1 = function (i) {
            ['click', 'touchend'].forEach(function (ev) {
                buttonMonth_AR[i].addEventListener(ev, function (e) {
                    var buttonMonth_ET = e.currentTarget;
                    var buttonMonth_ID = Number(buttonMonth_ET.id.substring(8, 10));
                    _this.counterMonth = buttonMonth_ID;
                    cb_title_EL.textContent = month_AR[_this.counterMonth];
                    _this.getMonthDays(_this.counterYear, _this.counterMonth);
                    _this.createMonthDays(_this.monthDays, _this.counterYear, _this.counterMonth);
                }, false);
            });
        };
        for (var i = 0; i < buttonMonth_AR.length; i++) {
            _loop_1(i);
        }
    };
    Functions.prototype.getMonthDays = function (year, month) {
        // Pierwszy dzień kolejnego miesiąca
        month += 1;
        var firstDay_NewMonth_Date = new Date(year, month - 1, 1);
        // Pierwszy dzień miesiąca
        var firstDay_CurrentMonth_Date = new Date(year, month, 1);
        // Odejmij pierwszy dzień kolejnego miesiąca od pierwszego dnia bieżącego miesiąca
        // Otrzymasz czas w milisekundach między nimi
        var betweenMonths_Time = firstDay_CurrentMonth_Date.getTime() - firstDay_NewMonth_Date.getTime();
        // Przekształć czas z milisekund na dni, dzieląc przez liczbę milisekund w jednym dniu
        var monthDays = betweenMonths_Time / (1000 * 60 * 60 * 24);
        // Zaokrąglij wynik do najbliższej liczby całkowitej
        monthDays = (monthDays > 31) ? 31 : monthDays; // Przy październiku wychodzi 32
        this.monthDays = Math.round(monthDays);
        this.createMonthDays(this.monthDays, this.counterYear, this.counterMonth);
    };
    Functions.prototype.createMonthDays = function (monthDays, year, month) {
        // MAIN CALENDAR: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        var MAIN_container = document.querySelector('div.cb-shadow');
        var MAIN_remove = document.querySelector('div.cb-days-number-group');
        MAIN_remove.remove();
        var MAIN_cb_days_number_group_EL = document.createElement('div');
        MAIN_cb_days_number_group_EL.setAttribute('class', 'cb-days-number-group');
        MAIN_container.appendChild(MAIN_cb_days_number_group_EL);
        // Spacjowa bloki: (pierwszy dzień miesiąca)
        var init_IDX = -1;
        var firstMonthDay_DATE = new Date(year, month, 1);
        var firstMonthDay_STR = String(firstMonthDay_DATE).slice(0, 3);
        init_IDX = (firstMonthDay_STR === 'Mon') ? 0 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Tue') ? 1 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Wed') ? 2 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Thu') ? 3 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Fri') ? 4 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Sat') ? 5 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Sun') ? 6 : init_IDX;
        console.log(firstMonthDay_DATE);
        for (var i = 0; i < monthDays + init_IDX; i++) {
            var MAIN_cb_days_number_item_box_EL = document.createElement('div');
            var MAIN_cb_days_number_item_content_EL = document.createElement('div');
            MAIN_cb_days_number_item_box_EL.setAttribute('class', 'cb-days-number-item-box');
            MAIN_cb_days_number_item_content_EL.setAttribute('class', 'cb-days-number-item-content');
            if (i >= init_IDX) {
                MAIN_cb_days_number_item_content_EL.textContent = String((i + 1) - init_IDX);
            }
            MAIN_cb_days_number_group_EL.appendChild(MAIN_cb_days_number_item_box_EL);
            MAIN_cb_days_number_item_box_EL.appendChild(MAIN_cb_days_number_item_content_EL);
        }
        // MAP CALENDAR: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //const MAP_container: HTMLDivElement = document.querySelector('div.');
    };
    Functions.prototype.addQuest = function () {
        //
    };
    Functions.prototype.deleteQuest = function () {
        //
    };
    Functions.prototype.updateLocalStorage = function () {
        //
    };
    return Functions;
}());
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
        //layout_DESKTOP.setContentCalendarBox_Width_AEL();
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
        var func = new Functions();
        func.setInitialGlobalVariables();
        func.getFullData();
        func.navArrow_Next();
        func.navArrow_Prev();
        func.buttonsMonth();
    };
    return App;
}());
;
var app = new App();
app.Main();
