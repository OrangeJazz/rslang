import { BACKEND_BASE_URL } from './config';
import { AudioManager } from './audio-manager';
import { Model } from '../models/model';
import { View } from '../views/view';
import { SprintGame } from '../views/main/sprint-game/sprint-game';
import { Textbook } from '../views/main/textbook/textbook';
import { GameChoiseOption, SprintGameItem } from '../types';

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
        this.view.onNewPageLoaded = (pageView) => {
            if (pageView instanceof Textbook) {
                pageView.onNewWordsPage = async (group, page) => {
                    console.log(`Загружаю слова... (group=${group}, page=${page})`);
                    const words = await this.model.getWords(group, page);
                    pageView.renderCards(words);
                    pageView.onAudioPlay = (audioNode) => this.audioManager.handle(audioNode);
                };

                pageView.onNewWordsPage(0, 0);
            } else if (pageView instanceof SprintGame) {
                pageView.onWordGroupSelect = async (group) => {
                    console.log(`Выбрана группа ${group}`);
                    const sprintGameItems = await this.model.getWordsForSprintGame(group);
                    const sprintGameItem = sprintGameItems.pop() as SprintGameItem;
                    const gameChoiseOptions = [] as GameChoiseOption[];
                    pageView.renderGameField(sprintGameItem);

                    pageView.onChoise = (word, isCorrect) => {
                        console.log(`${word} - ${isCorrect}`);
                        gameChoiseOptions.push({ value: word, isCorrect });
                        if (sprintGameItems.length === 0) {
                            pageView.renderGameResults(gameChoiseOptions);
                        } else {
                            const sprintGameItem = sprintGameItems.pop() as SprintGameItem;
                            pageView.renderGameField(sprintGameItem);
                        }
                    };
                };
            }
        };
    }
}
