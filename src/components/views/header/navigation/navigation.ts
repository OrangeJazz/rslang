import { Control } from '../../control';
import { Model } from '../../../models/model';
import './navigation.scss';
const model = new Model();
export class Nav extends Control {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'nav', 'nav');
        const navList = new Control<HTMLUListElement>(this.node, 'ul', 'nav__list');
        for (let i = 0; i < model.menu.menu.length; i++) {
            const navItem = new Control<HTMLElement>(navList.node, 'li');
            const navRef = new Control<HTMLAnchorElement>(
                navItem.node,
                'a',
                'nav__list-link',
                `${model.menu.menu[i].name}`
            );
            navRef.node.href = model.menu.menu[i].link;
        }
        const navItem = new Control<HTMLElement>(navList.node, 'li', 'nav-btn');
        new Control<HTMLButtonElement>(navItem.node, 'button', 'nav__list-link btn', 'Вход');
    }
}
