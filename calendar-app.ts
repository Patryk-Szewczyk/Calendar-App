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
    public setContentCalendarBox_Width_AEL(): void {
        let sidebar_LEFT: number = -250;
        let sidebar_LEFT_PRP: number = 0;
        ['load', 'resize'].forEach((ev) => {
            window.addEventListener(ev, () => {   
                sidebar_LEFT = document.querySelector('nav.dsk-nav-menu').getBoundingClientRect().left;
                sidebar_LEFT_PRP = (sidebar_LEFT === -250) ? 0 : 250;
                let time: string = '0.0s';
                this.setContentCalendarBox_Width_FNC(sidebar_LEFT_PRP, time);
            }, false);
        });
        const menuButton_EL: HTMLDivElement = document.querySelector('svg.dsk-menu-arrow');
        menuButton_EL.addEventListener('click', () => {
            sidebar_LEFT = document.querySelector('nav.dsk-nav-menu').getBoundingClientRect().left;
            sidebar_LEFT_PRP = (sidebar_LEFT === -250) ? 250 : 0;
            let time: string = '0.5s';
            this.setContentCalendarBox_Width_FNC(sidebar_LEFT_PRP, time);
        }, false);
    }
    private setContentCalendarBox_Width_FNC(sidebar_LEFT_PRP, time):void {const calenContBox_EL: HTMLDivElement = document.querySelector('div.dsk-calendar-box');
        let questBox_WIDTH: number = document.querySelector('div.dsk-quest-box').getBoundingClientRect().width;
        let result_WIDTH: number = (window.innerWidth - questBox_WIDTH - sidebar_LEFT_PRP);
        calenContBox_EL.style.width = result_WIDTH + 'px';
        calenContBox_EL.style.transitionDuration = time;
        /*console.log('window.innerWidth: ' + window.innerWidth + ' | questBox_WIDTH: ' + questBox_WIDTH + ' | sidebar_LEFT_PRP: ' + sidebar_LEFT_PRP);
        console.log('result: ' + result_WIDTH);
        console.log('sidebar_LEFT: ' + sidebar_LEFT);*/
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
        layout_DESKTOP.setContentCalendarBox_Width_AEL();
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
    }
};
const app: App = new App();
app.Main();
