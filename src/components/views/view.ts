import { Control } from './control';
import { Header } from './header/header';
import { Logo } from './header/logo';
import { Textbook } from './textbook/textbook';

export class View extends Control {
    header: Control;
    main: Textbook;
    footer: Control;
    logo: Control;

    constructor() {
        super(document.body, 'div');
        this.header = new Header(this.node);
        this.main = new Textbook(this.node);
        this.footer = new Control(this.node, 'footer');
        this.logo = new Logo(this.node);
    }
}
