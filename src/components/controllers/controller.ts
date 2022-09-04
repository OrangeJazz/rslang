import { BACKEND_BASE_URL } from './config';
import { AudioManager } from './audio-manager';
import { Model } from '../models/model';
import { View } from '../views/view';
// import { StartPage } from '../views/start-page/start-page';
import { Textbook } from '../views/main/textbook/textbook';
// import { AudiogameField } from '../views/main/audiogame/field/game-field';
import { Audiogame } from './audiogame';
// import { Word } from '../types';
import { AudiogameStart } from '../views/main/audiogame/start/audiogame-start';
import { AudiogameField } from '../views/main/audiogame/field/game-field';

export class Controller {
    model: Model;
    view: View;
    audioManager: AudioManager;
    audiogame: Audiogame;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.model.setBackendBaseURL(BACKEND_BASE_URL);
        this.audioManager = new AudioManager();
        this.audiogame = new Audiogame(model);
    }

    async start(): Promise<void> {
        this.view.onNewPageLoaded = async (pageView) => {
            if (pageView instanceof Textbook) {
                pageView.onNewWordsPage = async (group, page) => {
                    console.log(`Загружаю слова... (group=${group}, page=${page})`);
                    const words = await this.model.getWords(group, page);
                    pageView.renderCards(words);
                    pageView.onAudioPlay = (audioNode) => this.audioManager.handle(audioNode);
                };

                pageView.onNewWordsPage(0, 0);
            }

            if (pageView instanceof AudiogameStart) {
                pageView.setLevel = (selectedIndex) => {
                    sessionStorage.setItem('group', `${selectedIndex}`);
                };
                pageView.startGame = () => {
                    this.audiogame.start();
                };
            }

            if (pageView instanceof AudiogameField) {
                // console.log(game.words);
            }
        };
    }
}
