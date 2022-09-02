import { Control } from './control';
import { StartPage } from './main/start-page/start-page';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Textbook } from './main/textbook/textbook';

import './global.scss';

type PageView = StartPage | Textbook;

export class View extends Control {
    header: Control;
    main: PageView;
    footer: Control;
    onNewPageLoaded!: (pageView: PageView) => void;

    constructor() {
        super(document.body, 'div', 'app-container');
        this.header = new Header(this.node);
        this.header.onTextbook = () => this.onTextbook();
        this.main = new StartPage(this.node);
        this.main.onTextbook = () => this.onTextbook();
        this.footer = new Footer(this.node);
    }

    onTextbook() {
        this.main.destroy();
        this.main = new Textbook(this.node);
        this.onNewPageLoaded(this.main);
    }
}
