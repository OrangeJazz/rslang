import { BACKEND_BASE_URL } from './config';
import { AudioManager } from './audio-manager';
import { Model } from '../models/model';
import { View } from '../views/view';
import { SprintGame } from '../views/main/sprint-game/sprint-game';
import { SprintGameLevelChoise } from '../views/main/sprint-game-level-choise/sprint-game-level-choise';
import { Textbook } from '../views/main/textbook/textbook';
import { GameAnswer, SprintGameItem } from '../types';

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
            } else if (pageView instanceof SprintGameLevelChoise) {
                pageView.onLevelChoise = async (group) => {
                    console.log(`Выбрана группа ${group}`);
                    const sprintGameItems = await this.model.getWordsForSprintGame(group);
                    this.view.onSprintGameStart(sprintGameItems);
                };
            } else if (pageView instanceof SprintGame) {
                const sprintGameItems = pageView.sprintGameItems;
                const sprintGameItem = sprintGameItems.pop() as SprintGameItem;
                const gameAnswers = [] as GameAnswer[];
                let timerValueInSeconds = 10;
                pageView.renderGameField(sprintGameItem, timerValueInSeconds);
                let timerID: number | undefined = undefined;
                const updateTimer = () => {
                    timerValueInSeconds -= 1;
                    pageView.timer.node.innerText = `${timerValueInSeconds}`;
                    if (timerValueInSeconds === 0) {
                        clearInterval(timerID);
                        pageView.renderGameResults(gameAnswers);
                    }
                };
                timerID = setInterval(updateTimer, 1000) as unknown as number;

                pageView.onChoise = (word, isCorrect) => {
                    gameAnswers.push({ value: word, isCorrect });
                    if (sprintGameItems.length === 0) {
                        pageView.renderGameResults(gameAnswers);
                    } else {
                        const sprintGameItem = sprintGameItems.pop() as SprintGameItem;
                        pageView.renderGameField(sprintGameItem, timerValueInSeconds);
                    }
                };
            }
        };
    }
}
