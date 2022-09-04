import { Control } from '../../control';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Features } from './features/features';
import { Games } from './games/games';
import { Developers } from './developers/developers';

export class StartPage extends Control {
    onTextbook!: () => void;
    onAudiogameStart!: () => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main');
        const hero = new Hero(this.node);
        hero.onTextbook = () => this.onTextbook();
        new About(this.node);
        const features = new Features(this.node);
        features.onTextbook = () => this.onTextbook();
        const games = new Games(this.node);
        games.onAudiogameStart = () => this.onAudiogameStart();
        new Developers(this.node);
    }
}
