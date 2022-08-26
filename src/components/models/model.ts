import { Word } from '../types';
import { ICard } from '../types';
import { Menu } from './menu';
import { Devs } from './devs';

export class Model {
    private backendBaseURL: string;
    menu: Menu;
    developers: Devs;
    features: ICard[];
    games: ICard[];

    constructor(backendBaseURL = '') {
        this.backendBaseURL = backendBaseURL;
        this.menu = new Menu();
        this.developers = new Devs();

        this.features = [
            {
                name: 'Учебник',
                content: 'Слова в учебнике разбиты на разделы по их сложности. Учи то, что подходит именно тебе!',
                path: 'learn',
                link: '',
            },
            {
                name: 'Игры',
                content: 'С самого детства мы учимся играя. Играй в мини-игры и запоминай новые слова.',
                path: 'game',
                link: '',
            },
            {
                name: 'Статистика',
                content:
                    'Авторизуйся и отслеживай свой прогресс, чтобы успешно достичь поставленных целей. И помни, постоянная практика - залог успеха!',
                path: 'stat',
                link: '',
            },
        ];
        this.games = [
            {
                name: 'Аудиовызов',
                content: 'Выбери правильный вариант перевода после произнесения слова',
                path: 'listen',
                link: '',
            },
            {
                name: 'Спринт',
                content:
                    'Угадай, верен ли перевод слова. Получай очки за каждый правильный ответ. Но помни, что время ограничено!',
                path: 'sprint',
                link: '',
            },
        ];
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
