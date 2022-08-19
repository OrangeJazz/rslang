import { Control } from './control';
import { Textbook } from './textbook/textbook';

export class View extends Control {
    header: Control;
    main: Textbook;
    footer: Control;

    constructor() {
        super(document.body, 'div');
        this.header = new Control(this.node, 'header');
        this.main = new Textbook(this.node);
        this.footer = new Control(this.node, 'footer');
    }
}
