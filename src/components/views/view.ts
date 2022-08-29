import { Control } from './control';
import { StartPage } from './main/start-page/start-page';
import { Textbook } from './main/textbook/textbook';

import './global.scss';

type PageView = StartPage | Textbook;

export class View extends Control {
    header: Control;
    footer: Control;
    main: PageView;
    onNewPageLoaded!: (pageView: PageView) => void;

    constructor() {
        super(document.body, 'div', 'app-container');
        this.header = new Control(this.node, 'header', 'header');
        this.footer = new Control(this.node, 'footer', 'footer');
        this.main = new StartPage(this.node);

        this.main.onTextbook = () => {
            this.main.destroy();
            this.main = new Textbook(this.node);
            this.onNewPageLoaded(this.main);
        };
    }
}
