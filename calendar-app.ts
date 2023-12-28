type Functions_IFC = {
    daysNum: number,
    counterYear: number;
    counterMonth: number;
    counterDay: number;
    monthDays: number;
    setInitialGlobalVariables: Function;
    getFullData: Function;
    navArrow_Next: Function;
    navArrow_Prev: Function;
    getMonthDays: Function;
    createMonthDays: Function;   // Zrób tutaj całą aktualizację kalendarza!
    addQuest: Function;   // BRAK  // Dodawanie questa do tablicy JSON i aktywacja funkcji: createMonthDays()
    deleteQuest: Function;   // BRAK  // Usiwanie questa do tablicy JSON i aktywacja funkcji: createMonthDays()
    updateLocalStorage: Function;   // BRAK  // Aktualizowanie magazynu danych lokalnych przeglądarki
}
class Functions implements Functions_IFC {
    constructor() {}
    daysNum: number;
    counterYear: number;
    counterMonth: number;
    counterDay: number;
    monthDays: number;
    cb_title_EL: HTMLDivElement;
    public setInitialGlobalVariables(): void {
        this.counterYear = new Date().getFullYear();
        this.counterMonth = new Date().getMonth();
        this.counterDay = new Date().getDate();
        this.getMonthDays(this.counterYear, this.counterMonth);
        const month_AR: string[] = ['Styczeń ', 'Luty ',  'Marzec ', 'Kwiecień ', 'Maj ', 'Czerwiec ', 'Lipiec ', 'Sierpień ', 'Wrzesień ', 'Październik ', 'Listopad ', 'Grudzień '];
        const qb_title_EL: HTMLDivElement = document.querySelector('div.qb-title');
        qb_title_EL.textContent = month_AR[(new Date().getMonth())] + new Date().getDate() + ', ' + new Date().getFullYear();
    }
    public getFullData(): void {
        const data: Date = new Date();
    }
    public navArrow_Next(): void {
        const navArrowNext: HTMLDivElement = document.querySelector('div.ty-next-arrow');
        const ty_value__EL: HTMLDivElement = document.querySelector('div.ty-value');
        ['click', 'touchend'].forEach((ev) => {
            navArrowNext.addEventListener(ev, () => {
                this.counterYear += 1;
                ty_value__EL.textContent = String(this.counterYear);
                this.getMonthDays(this.counterYear, this.counterMonth);
            }, false);
        });
    }
    public navArrow_Prev(): void {
        const navArrowPrev: HTMLDivElement = document.querySelector('div.ty-prev-arrow');
        const ty_value__EL: HTMLDivElement = document.querySelector('div.ty-value');
        ['click', 'touchend'].forEach((ev) => {
            navArrowPrev.addEventListener(ev, () => {
                if (this.counterYear > new Date().getFullYear())  {
                    this.counterYear += -1;
                    this.getMonthDays(this.counterYear, this.counterMonth);
                    ty_value__EL.textContent = String(this.counterYear);
                }
            }, false);
        });
    }
    public buttonsMonth(): void {
        const buttonMonth_AR: any = document.querySelectorAll('div.mb-item');
        console.log(buttonMonth_AR);
        const cb_title_EL: HTMLDivElement = document.querySelector('div.cb-title');
        const month_AR: string[] = ['Styczeń', 'Luty',  'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        for (let i: number = 0; i < buttonMonth_AR.length; i++) {
            ['click', 'touchend'].forEach((ev) => {
                    buttonMonth_AR[i].addEventListener(ev, (e) => {
                    const buttonMonth_ET: HTMLDivElement = e.currentTarget;
                    const buttonMonth_ID: number = Number(buttonMonth_ET.id.substring(8, 10));
                    this.counterMonth = buttonMonth_ID;
                    cb_title_EL.textContent = month_AR[this.counterMonth];
                    this.getMonthDays(this.counterYear, this.counterMonth);
                    this.createMonthDays(this.monthDays, this.counterYear, this.counterMonth);
                }, false);
            });
        }
    }
    public getMonthDays(year: number, month: number):  void {
        // Pierwszy dzień kolejnego miesiąca
        month += 1;
        const firstDay_NewMonth_Date = new Date(year, month - 1, 1);
        // Pierwszy dzień miesiąca
        const firstDay_CurrentMonth_Date: Date = new Date(year, month, 1);
        // Odejmij pierwszy dzień kolejnego miesiąca od pierwszego dnia bieżącego miesiąca
        // Otrzymasz czas w milisekundach między nimi
        const betweenMonths_Time: number = firstDay_CurrentMonth_Date.getTime() - firstDay_NewMonth_Date.getTime();
        // Przekształć czas z milisekund na dni, dzieląc przez liczbę milisekund w jednym dniu
        let monthDays: number = betweenMonths_Time / (1000 * 60 * 60 * 24);
        // Zaokrąglij wynik do najbliższej liczby całkowitej
        monthDays = (monthDays > 31) ? 31 : monthDays;   // Przy październiku wychodzi 32
        this.monthDays = Math.round(monthDays);
        this.createMonthDays(this.monthDays, this.counterYear, this.counterMonth);

    }
    public createMonthDays(monthDays: number, year: number, month: number): void {
        // MAIN CALENDAR: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        const MAIN_container: HTMLDivElement = document.querySelector('div.cb-shadow');
        const MAIN_remove: HTMLDivElement = document.querySelector('div.cb-days-number-group');
        MAIN_remove.remove();
        const MAIN_cb_days_number_group_EL: HTMLDivElement = document.createElement('div');
        MAIN_cb_days_number_group_EL.setAttribute('class', 'cb-days-number-group');
        MAIN_container.appendChild(MAIN_cb_days_number_group_EL);
        // Spacjowa bloki: (pierwszy dzień miesiąca)
        let init_IDX = -1;
        const firstMonthDay_DATE: Date = new Date(year, month, 1);
        const firstMonthDay_STR: string = String(firstMonthDay_DATE).slice(0, 3);
        init_IDX = (firstMonthDay_STR === 'Mon') ? 0 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Tue') ? 1 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Wed') ? 2 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Thu') ? 3 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Fri') ? 4 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Sat') ? 5 : init_IDX;
        init_IDX = (firstMonthDay_STR === 'Sun') ? 6 : init_IDX;
        console.log(firstMonthDay_DATE);
        for (let i: number = 0; i < monthDays + init_IDX; i++)
        {
            const MAIN_cb_days_number_item_box_EL: HTMLDivElement = document.createElement('div');
            const MAIN_cb_days_number_item_content_EL: HTMLDivElement = document.createElement('div');
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
    }
    public addQuest(): void {
        //
    }
    public deleteQuest(): void {
        //
    }
    public updateLocalStorage(): void {
        //
    }
}







type Layout_DESKTOP_IFC = {
    setMenuButton_AEL: Function,
    setContentCalendarBox_Width_AEL: Function,
    setContentCalendarBox_Width_FNC: Function
};
class Layout_DESKTOP implements Layout_DESKTOP {
    constructor() {}
    public setMenuButton_AEL(): void {
        const menuButton_EL: HTMLDivElement = document.querySelector('svg.dsk-menu-arrow');
        let isShow: boolean = false;
        menuButton_EL.addEventListener('click', () => {
            const sidebar: HTMLElement = document.querySelector('nav.dsk-nav-menu');
            switch (isShow){
                case false: {
                    isShow = true;
                    setTimeout(() => {
                        sidebar.style.left = '0px';
                        menuButton_EL.style.transform = 'rotateZ(0deg)';
                        sidebar.style.transitionDuration = '0.5s';
                    }, 1);
                } break;
                case true: {
                    isShow = false;
                    setTimeout(() => {
                        sidebar.style.left = '-250px';
                        menuButton_EL.style.transform = 'rotateZ(180deg)';
                        sidebar.style.transitionDuration = '0.5s';
                    }, 1);
                } break;
            }
        }, false);
    }
};



type Layout_IFC = {
    setAppBody_Height_AEL: Function,
    setLayout_DESKTOP: Function
};
// MEGA WAŻNE!
// Chociaż klasa "Layout" może działać bez konstruktora, to w przypadku,
// gdy jest ona używana wewnątrz innej klasy (takiej jak klasa App),
// konstruktor jest potrzebny.
class Layout implements Layout_IFC {
    constructor() {}
    public setAppBody_Height_AEL(): void {
        const appBody_EL: HTMLDivElement = document.querySelector('div.app-body');
        ['load', 'resize'].forEach((ev) => {
            addEventListener(ev, () => {
                appBody_EL.style.height = window.innerHeight + 'px';
            }, false);
        });
    }
    setLayout_DESKTOP(): void {
        const layout_DESKTOP: Layout_DESKTOP = new Layout_DESKTOP();
        layout_DESKTOP.setMenuButton_AEL();
        //layout_DESKTOP.setContentCalendarBox_Width_AEL();
    }
};



// MEGA WAŻNE!
// W JavaScript nie mogę programować obiektowo tak jak w c#, ponieważ deklaracje klas
// wywołują się tak jak deklaracje zmiennych - proceduralnie. Kiedy klasa "App"
// znajdowałaby się przed klasą "Layout", wówczas nie można byłoby zadeklarować instancji
// klasy "Layout", ponieważ deklaracja tej klasy znajdowałaby się pod odwołaniem do niej,
// a nie przed.
type App_IFC = {
    Main: Function
};
class App implements App_IFC {
    public Main(): void {
        const layout: Layout = new Layout();
        layout.setAppBody_Height_AEL();
        layout.setLayout_DESKTOP();
        const func = new Functions();
        func.setInitialGlobalVariables();
        func.getFullData();
        func.navArrow_Next();
        func.navArrow_Prev();
        func.buttonsMonth();
    }
};
const app: App = new App();
app.Main();
