import { Person } from '../types';

export class Devs {
    devs: Person[];
    constructor() {
        this.devs = [
            {
                name: 'Антон',
                link: 'https://github.com/antonsergeev',
                role: 'Team Lead',
                imgPath: 'Anton',
                work: 'Шаблон архитектуры приложения, раздел учебника, карточки слов, игра "Спринт"',
            },
            {
                name: 'Олег',
                link: 'https://github.com/ali-gator',
                role: 'Developer',
                imgPath: 'Oleg',
                work: 'Настройка и развертывание бэкенда, функционал авторизации и регистрации пользователей',
            },
            {
                name: 'Мария',
                link: 'https://github.com/OrangeJazz',
                role: 'Developer',
                imgPath: 'Orange',
                work: 'Дизайн приложения, главная страница, шапка, подвал, карточки слов, игра "Аудиовызов"',
            },
        ];
    }
}
