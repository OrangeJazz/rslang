import { Control } from './control';
import { StartPage } from './main/start-page/start-page';
import { Header } from './header/header';
import { Logo } from './header/logo';
import { Textbook } from './main/textbook/textbook';

import './global.scss';

type PageView = StartPage | Textbook;

export class View extends Control {
    header: Control;
    footer: Control;
    main: PageView;
    onNewPageLoaded!: (pageView: PageView) => void;
    logo: Control;

    constructor() {
        super(document.body, 'div', 'app_container');
        this.header = new Header(this.node, 'header');
        this.footer = new Control(this.node, 'footer', 'footer');
        this.main = new StartPage(this.node);

        this.main.onTextbook = () => {
            this.main.destroy();
            this.main = new Textbook(this.node);
            this.onNewPageLoaded(this.main);
        };
        this.logo = new Logo(this.node);
    }
}
