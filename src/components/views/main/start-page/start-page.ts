import { Control } from '../../control';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Features } from './features/features';
import { Games } from './games/games';
import { Developers } from './developers/developers';

export class StartPage extends Control {
    onTextbook!: () => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main');
        new Hero(this.node);
        new About(this.node);
        new Features(this.node);
        new Games(this.node);
        new Developers(this.node);
        // const container = new Control(this.node, 'div', 'container');
        // const button = new Control<HTMLButtonElement>(this.node, 'button', '', 'Учебник');
        // button.node.type = 'buton';
        // button.node.onclick = () => this.onTextbook();
    }
}
