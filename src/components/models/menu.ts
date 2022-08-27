import { Link } from '../types';

export class Menu {
    menu: Link[];
    constructor() {
        this.menu = [
            { name: 'Главная', link: '#' },
            { name: 'Учебник', link: '2' },
            { name: 'Игры', link: '#games' },
            { name: 'Статистика', link: '4' },
        ];
    }
}
