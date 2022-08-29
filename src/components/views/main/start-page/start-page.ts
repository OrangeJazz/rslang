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
        const hero = new Hero(this.node);
        hero.onTextbook = () => this.onTextbook();
        new About(this.node);
        new Features(this.node);
        new Games(this.node);
        new Developers(this.node);
    }
}
