import { ICard } from '../types';

export class Features {
    features: ICard[];
    constructor() {
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
                link: '#games',
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
}
