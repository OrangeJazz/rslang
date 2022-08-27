import { Word } from '../types';
import { Features } from './features';
import { Games } from './games';
import { Menu } from './menu';
import { Devs } from './devs';

export class Model {
    private backendBaseURL: string;
    menu: Menu;
    developers: Devs;
    features: Features;
    games: Games;

    constructor(backendBaseURL = '') {
        this.backendBaseURL = backendBaseURL;
        this.menu = new Menu();
        this.developers = new Devs();
        this.features = new Features();
        this.games = new Games();
    }

    setBackendBaseURL(backendBaseURL: string) {
        this.backendBaseURL = backendBaseURL;
    }

    async getWords(group: number, page: number): Promise<Word[]> {
        const url = `${this.backendBaseURL}words?group=${group}&page=${page}`;
        const response = await fetch(url);
        const words = response.json();
        return words;
    }
}
