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
                work: 'Тимлид нашей небольшой команды и просто отличный парень. Разрабатывал страницу учебника и игру "Спринт". Помогал всем по возможности и координировал работу команды.',
            },
            {
                name: 'Олег',
                link: 'https://github.com/ali-gator',
                role: 'Developer',
                imgPath: 'Oleg',
                work: `I fall in love with the front-end when, as a customer, I encountered difficulties in understanding business tasks by performers and their formal approach to development. I like to create clean code and see the result. I follow the news from the world of Frontend, listen to podcasts, read articles and educational literature. Participated in the final of the Digital Hackathon 2019 in Kazan. I love to travel, visited 15 countries.`,
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
