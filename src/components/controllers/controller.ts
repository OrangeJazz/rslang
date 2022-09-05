import { BACKEND_BASE_URL } from './config';
import { AudioManager } from './audio-manager';
import { SprintGameController } from './sprint-game-controller';

import { Model } from '../models/model';

import { View } from '../views/view';
import { SprintGameField } from '../views/main/sprint-game/field/sprint-game-field';
import { SprintGameStart } from '../views/main/sprint-game/start/sprint-game-start';
import { Textbook } from '../views/main/textbook/textbook';

export class Controller {
    model: Model;
    view: View;
    audioManager: AudioManager;
    sprintGameController: SprintGameController;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.model.setBackendBaseURL(BACKEND_BASE_URL);
        this.audioManager = new AudioManager();
        this.sprintGameController = new SprintGameController(model, view);
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
            } else if (pageView instanceof SprintGameStart) {
                pageView.onGameStart = async (groupNumber) => {
                    console.log(`Выбрана группа ${groupNumber}`);
                    const pageNumber = undefined;
                    this.view.onSprintGameField(groupNumber, pageNumber);
                };
            } else if (pageView instanceof SprintGameField) {
                this.sprintGameController.startGame(pageView);
            }
        };
    }
}
