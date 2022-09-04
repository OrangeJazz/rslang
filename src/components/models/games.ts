import { ICard } from '../types';

export class Games {
    games: ICard[];
    constructor() {
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
}
