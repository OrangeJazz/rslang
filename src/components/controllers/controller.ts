import { BACKEND_BASE_URL } from './config';
import { AudioManager } from './audio-manager';
import { SprintGameController } from './sprint-game-controller';

import { Model } from '../models/model';

import { View } from '../views/view';
import { SprintGameField } from '../views/main/sprint-game/field/sprint-game-field';
import { SprintGameStart } from '../views/main/sprint-game/start/sprint-game-start';
import { Textbook } from '../views/main/textbook/textbook';
import { Auth } from '../views/main/auth/auth';
import { User } from '../types';
import { Api } from './api';

import { Audiogame } from './audiogame';
import { AudiogameStart } from '../views/main/audiogame/start/audiogame-start';
import { AudiogameField } from '../views/main/audiogame/field/game-field';
import { AudiogameResult } from '../views/main/audiogame/result/game-result';

export class Controller {
    model: Model;
    view: View;
    audioManager: AudioManager;
    sprintGameController: SprintGameController;
    api: Api;
    audiogame: Audiogame;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.model.setBackendBaseURL(BACKEND_BASE_URL);
        this.audioManager = new AudioManager();
        this.sprintGameController = new SprintGameController(model, view);
        this.api = new Api(BACKEND_BASE_URL);
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
                    const userInfo = await this.api.getUserInfo();
                    console.log(userInfo);
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
            if (pageView instanceof Auth) {
                pageView.auth = async () => {
                    const form = document.querySelector('.auth__form');
                    form?.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const formValues = new FormData(e.target as HTMLFormElement);
                        const { email, name, password } = Object.fromEntries(formValues.entries());
                        if (formValues.has('name')) {
                            await this.api.signUp({ email, name, password } as unknown as User);
                        }
                        await this.api.signIn({
                            email,
                            password,
                        } as unknown as Omit<User, 'name'>);
                        window.location.replace('/');
                    });
                };
                pageView.auth();
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
                if (this.audiogame.restWords.length > 0) {
                    const word = this.audiogame.getWord();
                    const answers = this.audiogame.generateAnswers(word);
                    pageView.renderGameCard(word, answers);
                    pageView.onAudioPlay = (audioNode) => this.audioManager.handle(audioNode);
                    pageView.getNoAnswer = () => this.audiogame.addWrongAnswer(word);
                    pageView.getAnswer = (answer) => {
                        const result = this.audiogame.checkAnswer(answer);
                        result ? this.audiogame.addRightAnswer(answer) : this.audiogame.addWrongAnswer(answer);
                    };
                }
                pageView.checkNextPage = () => {
                    return this.audiogame.restWords.length > 0;
                };
            }
            if (pageView instanceof AudiogameResult) {
                pageView.renderCards(this.audiogame.rightAnswers, pageView.learnWords);
                pageView.renderCards(this.audiogame.wrongAnswers, pageView.mistakes);
                pageView.getResult = () => this.audiogame.rightAnswers.size;
                pageView.onAudioPlay = (audioNode) => this.audioManager.handle(audioNode);
                this.audiogame = new Audiogame(this.model);
            }
        };
    }
}
