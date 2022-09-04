import { Control } from '../../control';
// import { Model } from '../../../models/model';
import './navigation.scss';

// const model = new Model();
export class Nav extends Control {
    onTextbook!: () => void;
    onStartPage!: () => void;
    onAuth!: () => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'nav', 'nav');
        const navList = new Control<HTMLUListElement>(this.node, 'ul', 'nav__list');
        // for (let i = 0; i < model.menu.menu.length; i++) {
        const navItem1 = new Control<HTMLElement>(navList.node, 'li');
        const navRef1 = new Control<HTMLAnchorElement>(navItem1.node, 'a', 'nav__list-link', `Главная`);
        navRef1.node.onclick = () => this.onStartPage();
        navRef1.node.href = '#';
        const navItem2 = new Control<HTMLElement>(navList.node, 'li');
        const navRef2 = new Control<HTMLAnchorElement>(navItem2.node, 'a', 'nav__list-link', `Учебник`);
        navRef2.node.onclick = () => this.onTextbook();
        navRef2.node.href = '#';
        const navItem3 = new Control<HTMLElement>(navList.node, 'li');
        const navRef3 = new Control<HTMLAnchorElement>(navItem3.node, 'a', 'nav__list-link', `Игры`);
        navRef3.node.onclick = () => this.onStartPage();
        navRef3.node.href = '#games';
        const navItem4 = new Control<HTMLElement>(navList.node, 'li');
        const navRef4 = new Control<HTMLAnchorElement>(navItem4.node, 'a', 'nav__list-link', `Статистика`);
        navRef4.node.onclick = () => this.onTextbook();
        navRef4.node.href = '#';
        // }
        const navItem5 = new Control<HTMLElement>(navList.node, 'li', 'nav-btn');
        const navRef5 = new Control<HTMLAnchorElement>(navItem5.node, 'a', 'nav__list-link btn', 'Вход');
        navRef5.node.onclick = () => this.onAuth();
        navRef5.node.href = '#';
    }
}
