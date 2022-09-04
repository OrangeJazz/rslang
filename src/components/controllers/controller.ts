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

export class Controller {
    model: Model;
    view: View;
    audioManager: AudioManager;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.model.setBackendBaseURL(BACKEND_BASE_URL);
        this.audioManager = new AudioManager();
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

                    // pageView.onNewGame = async (group, page) => {
                    //     const words = (await this.model.getWords(group, page)) as Word[];
                    //     return words;
                    // };
                    // const wordsInGame = await pageView.onNewGame(group, page);

                    // const settings = [group, page];
                    // return settings;
                };
                new Audiogame(this.model);
            }

            // if (pageView instanceof AudiogameField) {
            // }
        };
    }
}
