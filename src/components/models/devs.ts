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
                work: 'Тимлид нашей небольшой команды и просто отличный парень. Разрабатывал шаблон архитектуры приложения, раздел учебника, карточки слов и игра "Спринт". Помогал всем по возможности и координировал работу команды.',
            },
            {
                name: 'Олег',
                link: 'https://github.com/ali-gator',
                role: 'Developer',
                imgPath: 'Oleg',
                work: 'Настройка и развертывание бэкенда, функционал авторизации и регистрации пользователей.',
            },
            {
                name: 'Мария',
                link: 'https://github.com/OrangeJazz',
                role: 'Developer',
                imgPath: 'Orange',
                work: 'Начинающий frontend разработчик. Взялась за разработку игры "Аудиовызов" и главной страницы приложения, роутинг, а также за вопросы, связанные с дизайном и макетами',
            },
        ];
    }
}
