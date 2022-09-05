import { Control } from './control';
import { GameAnswer } from '../types';

import { SprintGameField } from './main/sprint-game/field/sprint-game-field';
import { SprintGameResult } from './main/sprint-game/result/sprint-game-result';
import { SprintGameStart } from './main/sprint-game/start/sprint-game-start';
import { StartPage } from './main/start-page/start-page';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Textbook } from './main/textbook/textbook';
import { AudiogameStart } from './main/audiogame/start/audiogame-start';
import { AudiogameField } from './main/audiogame/field/game-field';
import { AudiogameResult } from './main/audiogame/result/game-result';
import { Auth, AuthPageType } from './main/auth/auth';

import './global.scss';

type PageView =
    | StartPage
    | Textbook
    | Auth
    | AudiogameStart
    | AudiogameField
    | AudiogameResult
    | SprintGameStart
    | SprintGameField
    | SprintGameResult;

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
        (this.main as StartPage).onTextbook = () => this.onTextbook();
        (this.main as StartPage).onAudiogameStart = () => this.onAudiogameStart();
        (this.main as StartPage).onSprintGameStart = () => this.onSprintGameStart();
        this.footer = new Footer(this.node);
        this.footer.onTextbook = () => this.onTextbook();
        this.footer.onStartPage = () => this.onStartPage();
    }

    onTextbook() {
        this.main.destroy();
        this.main = new Textbook(this.node);
        (this.main as Textbook).onSprintGameField = (group: number, page: number | undefined) =>
            this.onSprintGameField(group, page);
        (this.main as Textbook).onAudiogameField = () => this.onAudiogameField();
        this.onNewPageLoaded(this.main);
    }

    onStartPage() {
        this.main.destroy();
        this.main = new StartPage(this.node);
        (this.main as StartPage).onTextbook = () => this.onTextbook();
        (this.main as StartPage).onAudiogameStart = () => this.onAudiogameStart();
        (this.main as StartPage).onSprintGameStart = () => this.onSprintGameStart();
        this.onNewPageLoaded(this.main);
    }

    onAudiogameStart = () => {
        this.main.destroy();
        this.main = new AudiogameStart(this.node);
        (this.main as AudiogameStart).onAudiogameField = () => this.onAudiogameField();
        this.onNewPageLoaded(this.main);
    };

    onAudiogameField = () => {
        this.main.destroy();
        this.main = new AudiogameField(this.node);
        (this.main as AudiogameField).onAudiogameField = () => this.onAudiogameField();
        (this.main as AudiogameField).onAudiogameResult = () => this.onAudiogameResult();
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
        (this.main as Auth).onLogin = () => this.onLogin();
        this.onNewPageLoaded(this.main);
    };

    onLogin = () => {
        this.main.destroy();
        this.main = new Auth(this.node, AuthPageType.login);
        (this.main as Auth).onRegister = () => this.onRegister();
        this.onNewPageLoaded(this.main);
    };

    onSprintGameStart = () => {
        this.main.destroy();
        this.main = new SprintGameStart(this.node);
        this.onNewPageLoaded(this.main);
    };

    onSprintGameField = (group: number, page: number | undefined) => {
        this.main.destroy();
        this.main = new SprintGameField(this.node, group, page);
        this.onNewPageLoaded(this.main);
    };

    onSprintGameResult = (gameAnswers: GameAnswer[]) => {
        this.main.destroy();
        this.main = new SprintGameResult(this.node, gameAnswers);
        this.onNewPageLoaded(this.main);
    };
}
