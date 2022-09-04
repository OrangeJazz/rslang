import { Control } from './control';
import { SprintGame } from './main/sprint-game/sprint-game';
import { StartPage } from './main/start-page/start-page';
import { Textbook } from './main/textbook/textbook';

import './global.scss';

type PageView = StartPage | Textbook | SprintGame;

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

        // this.main.onTextbook = () => {
        //     this.main.destroy();
        //     this.main = new Textbook(this.node);
        //     this.onNewPageLoaded(this.main);
        // };

        this.main.onTextbook = () => {
            this.main.destroy();
            this.main = new SprintGame(this.node);
            this.onNewPageLoaded(this.main);
        };
    }
}
