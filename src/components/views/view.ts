import { Control } from './control';
import { StartPage } from './main/start-page/start-page';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Textbook } from './main/textbook/textbook';
import { AudiogameStart } from './main/audiogame/start/audiogame-start';
import { AudiogameField } from './main/audiogame/field/game-field';
import { Auth, AuthPageType } from './main/auth/auth';

import './global.scss';
import { AudiogameResult } from './main/audiogame/result/game-result';

type PageView = StartPage | Textbook | AudiogameStart | Auth | AudiogameField | AudiogameResult;

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
        this.header.onAuth = () => this.onLogin();
        this.main = new StartPage(this.node);
        this.main.onTextbook = () => this.onTextbook();
        this.main.onAudiogameStart = () => this.onAudiogameStart();
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
    }

    onAudiogameStart = () => {
        this.main.destroy();
        this.main = new AudiogameStart(this.node);
        this.onNewPageLoaded(this.main);
        this.main.onAudiogameField = () => this.onAudiogameField();
    };

    onAudiogameField = () => {
        this.main.destroy();
        this.main = new AudiogameField(this.node);
        this.main.onAudiogameField = () => this.onAudiogameField();
        this.main.onAudiogameResult = () => this.onAudiogameResult();
        this.onNewPageLoaded(this.main);
    };

    onAudiogameResult = () => {
        this.main.destroy();
        this.main = new AudiogameResult(this.node);
        this.onNewPageLoaded(this.main);
    };

    onRegister = () => {
        this.main.destroy();
        this.main = new Auth(this.node, AuthPageType.register);
        this.main.onLogin = () => this.onLogin();
        this.onNewPageLoaded(this.main);
    };

    onLogin = () => {
        this.main.destroy();
        this.main = new Auth(this.node, AuthPageType.login);
        this.main.onRegister = () => this.onRegister();
        this.onNewPageLoaded(this.main);
    };
}
