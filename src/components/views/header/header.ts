import { Control } from '../control';
import { Logo } from './logo/logo';
import { Nav } from './navigation/navigation';

import './header.scss';

export class Header extends Control {
    logo: Logo;
    nav: Nav;
    onTextbook!: () => void;
    onStartPage!: () => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'header', 'header header_main');
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'header__wrapper');
        this.logo = new Logo(wrapper.node);
        this.logo.onStartPage = () => this.onStartPage();
        this.nav = new Nav(wrapper.node);
        this.nav.onTextbook = () => this.onTextbook();
        this.nav.onStartPage = () => this.onStartPage();
    }
}
