import { Control } from '../../control';

export class StartPage extends Control {
    onTextbook!: () => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main');
        const container = new Control(this.node, 'div', 'container');
        const button = new Control<HTMLButtonElement>(container.node, 'button', '', 'Учебник');
        button.node.type = 'buton';
        button.node.onclick = () => this.onTextbook();
    }
}
