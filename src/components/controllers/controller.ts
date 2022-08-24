import { Model } from '../models/model';
import { View } from '../views/view';
import { BACKEND_BASE_URL } from './config';

export class Controller {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
        this.model.setBackendBaseURL(BACKEND_BASE_URL);
    }

    async start() {
        this.view.main.onLoadWords = async (group, page) => {
            console.log(`Загружаю слова... (group=${group}, page=${page})`);
            const words = await this.model.getWords(group, page);
            this.view.main.words = words;
            this.view.main.render();
        };
    }
}
