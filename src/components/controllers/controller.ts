import { BACKEND_BASE_URL } from './config';
import { Model } from '../models/model';
import { View } from '../views/view';
// import { StartPage } from '../views/start-page/start-page';
import { Textbook } from '../views/main/textbook/textbook';

export class Controller {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.model.setBackendBaseURL(BACKEND_BASE_URL);
    }

    async start() {
        this.view.onNewPageLoaded = (pageView) => {
            if (pageView instanceof Textbook) {
                pageView.onNewWordsPage = async (group, page) => {
                    console.log(`Загружаю слова... (group=${group}, page=${page})`);
                    const words = await this.model.getWords(group, page);
                    pageView.renderCards(words);
                };
                pageView.onNewWordsPage(0, 0);
            }
        };
    }
}
