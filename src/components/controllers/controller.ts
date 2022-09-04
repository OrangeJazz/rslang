import { BACKEND_BASE_URL } from './config';
import { AudioManager } from './audio-manager';
import { Model } from '../models/model';
import { View } from '../views/view';
// import { StartPage } from '../views/start-page/start-page';
import { Textbook } from '../views/main/textbook/textbook';
import { Auth } from '../views/main/auth/auth';
import { User } from '../types';

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
            }
            if (pageView instanceof Auth) {
                pageView.auth = async () => {
                    const form = document.querySelector('.auth__form');
                    form?.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const formValues = new FormData(e.target as HTMLFormElement);
                        const { email, name, password } = Object.fromEntries(formValues.entries());
                        if (formValues.has('name')) {
                            await this.model.signUp({ email, name, password } as unknown as User);
                        }
                        const { token, userId } = await this.model.signIn({
                            email,
                            password,
                        } as unknown as Omit<User, 'name'>);
                        localStorage.setItem('jwt', token);
                        localStorage.setItem('userId', userId);
                        window.location.replace('/');
                    });
                };
                pageView.auth();
            }
        };
    }
}
