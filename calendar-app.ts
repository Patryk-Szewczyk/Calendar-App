type Layout_DESKTOP_IFC = {
    setMenuButton_AEL: Function
};
class Layout_DESKTOP implements Layout_DESKTOP {
    constructor() {}
    public setMenuButton_AEL(): void {
        const menuButton: HTMLDivElement = document.querySelector('svg.menu-arrow');
        let isShow: boolean = false;
        menuButton.addEventListener('click', () => {
            const sidebar: HTMLElement = document.querySelector('nav.nav-menu');
            switch (isShow){
                case false: {
                    isShow = true;
                    setTimeout(() => {
                        sidebar.style.left = '0px';
                        menuButton.style.transform = 'rotateZ(0deg)';
                        sidebar.style.transitionDuration = '0.5s';
                    }, 1);
                } break;
                case true: {
                    isShow = false;
                    setTimeout(() => {
                        sidebar.style.left = '-250px';
                        menuButton.style.transform = 'rotateZ(180deg)';
                        sidebar.style.transitionDuration = '0.5s';
                    }, 1);
                } break;
            }
        }, false);
    }
};



type Layout_IFC = {
    setAppBody_AEL: Function,
    setLayout_DESKTOP: Function
};
// MEGA WAŻNE!
// Chociaż klasa "Layout" może działać bez konstruktora, to w przypadku,
// gdy jest ona używana wewnątrz innej klasy (takiej jak klasa App),
// konstruktor jest potrzebny.
class Layout implements Layout_IFC {
    constructor() {}
    public setAppBody_AEL(): void {
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
    public Main() {
        const layout: Layout = new Layout();
        layout.setAppBody_AEL();
        layout.setLayout_DESKTOP();
    }
};
const app: App = new App();
app.Main();