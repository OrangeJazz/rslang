import { Word } from '../types';

interface Link {
    name: string;
    link: string;
}

export interface Card {
    name: string;
    content: string;
    path: string;
    link: string;
}

export class Model {
    private backendBaseURL: string;
    menu: Link[];
    developers: Link[];
    features: Card[];

    constructor(backendBaseURL = '') {
        this.backendBaseURL = backendBaseURL;
        this.menu = [
            { name: 'Главная', link: '1' },
            { name: 'Учебник', link: '2' },
            { name: 'Игры', link: '3' },
            { name: 'Статистика', link: '4' },
        ];
        this.developers = [
            { name: 'Антон', link: 'https://github.com/antonsergeev' },
            { name: 'Олег', link: 'https://github.com/ali-gator' },
            { name: 'Мария', link: 'https://github.com/OrangeJazz' },
        ];

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
