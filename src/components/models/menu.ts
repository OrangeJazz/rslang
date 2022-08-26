import { Link } from '../types';

export class Menu {
    menu: Link[];
    constructor() {
        this.menu = [
            { name: 'Главная', link: '1' },
            { name: 'Учебник', link: '2' },
            { name: 'Игры', link: '3' },
            { name: 'Статистика', link: '4' },
        ];
    }
}
