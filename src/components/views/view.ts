import { Control } from './control';
import { SprintGame } from './main/sprint-game/sprint-game';
import { StartPage } from './main/start-page/start-page';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Textbook } from './main/textbook/textbook';
import { AudiogameStart } from './main/audiogame-start/audiogame-start';

import './global.scss';

type PageView = StartPage | Textbook | SprintGame | AudiogameStart;

export class View extends Control {
    header: Header;
    main: PageView;
    footer: Footer;
    onNewPageLoaded!: (pageView: PageView) => void;

    constructor() {
        super(document.body, 'div', 'app-container');
        this.header = new Header(this.node);
        this.header.onTextbook = () => this.onTextbook();
        this.header.onStartPage = () => this.onStartPage();
        this.main = new StartPage(this.node);
        this.main.onTextbook = () => this.onTextbook();
        this.main.onAudiogameStart = () => this.onAudiogameStart();
        this.main.onSprintGameStart = () => this.onSprintGameStart();
        this.footer = new Footer(this.node);
        this.footer.onTextbook = () => this.onTextbook();
        this.footer.onStartPage = () => this.onStartPage();
    }

    onTextbook() {
        this.main.destroy();
        this.main = new Textbook(this.node);
        this.onNewPageLoaded(this.main);
    }

    onStartPage() {
        this.main.destroy();
        this.main = new StartPage(this.node);
        this.onNewPageLoaded(this.main);
        this.main.onTextbook = () => this.onTextbook();
        this.main.onAudiogameStart = () => this.onAudiogameStart();
        this.main.onSprintGameStart = () => this.onSprintGameStart();
    }

    onAudiogameStart = () => {
        this.main.destroy();
        this.main = new AudiogameStart(this.node);
        this.onNewPageLoaded(this.main);
    };

    onSprintGameStart = () => {
        this.main.destroy();
        this.main = new SprintGame(this.node);
        this.onNewPageLoaded(this.main);
    };
}
