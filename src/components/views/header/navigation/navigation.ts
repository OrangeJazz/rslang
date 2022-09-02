import { Control } from '../../control';
// import { Model } from '../../../models/model';
import './navigation.scss';
// const model = new Model();
export class Nav extends Control {
    onTextbook!: () => void;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'nav', 'nav');
        const navList = new Control<HTMLUListElement>(this.node, 'ul', 'nav__list');
        // for (let i = 0; i < model.menu.menu.length; i++) {
        const navItem1 = new Control<HTMLElement>(navList.node, 'li');
        const navRef1 = new Control(navItem1.node, 'a', 'nav__list-link', `Главная`);
        navRef1.node.onclick = () => this.onTextbook();
        const navItem2 = new Control<HTMLElement>(navList.node, 'li');
        const navRef2 = new Control<HTMLButtonElement>(navItem2.node, 'button', 'nav__list-link', `Учебник`);
        navRef2.node.type = 'button';
        navRef2.node.onclick = () => this.onTextbook();
        const navItem3 = new Control<HTMLElement>(navList.node, 'li');
        const navRef3 = new Control(navItem3.node, 'span', 'nav__list-link', `Игры`);
        navRef3.node.onclick = () => this.onTextbook();
        const navItem4 = new Control<HTMLElement>(navList.node, 'li');
        const navRef4 = new Control(navItem4.node, 'span', 'nav__list-link', `Статистика`);
        navRef4.node.onclick = () => this.onTextbook();
        // if (model.menu.menu[i].name === 'Учебник') {
        // }
        // navRef.node.href = model.menu.menu[i].link;
        // }
        const navItem = new Control<HTMLElement>(navList.node, 'li', 'nav-btn');
        new Control<HTMLButtonElement>(navItem.node, 'button', 'nav__list-link btn', 'Вход');
    }
}
