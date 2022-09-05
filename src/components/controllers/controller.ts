import { BACKEND_BASE_URL } from './config';
import { AudioManager } from './audio-manager';
import { Model } from '../models/model';
import { View } from '../views/view';
import { Textbook } from '../views/main/textbook/textbook';
import { Auth } from '../views/main/auth/auth';
import { User } from '../types';
import { Api } from './api';

export class Controller {
    model: Model;
    view: View;
    audioManager: AudioManager;
    api: Api;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.model.setBackendBaseURL(BACKEND_BASE_URL);
        this.audioManager = new AudioManager();
        this.api = new Api(BACKEND_BASE_URL);
    }

    async start(): Promise<void> {
        this.view.onNewPageLoaded = (pageView) => {
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
        };
    }
}
