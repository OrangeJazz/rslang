import { Control } from '../../control';
import './audiogame-start.scss';

export class AudiogameStart extends Control {
    onAudiogame!: () => void;
    onStartPage!: () => void;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main audiogame');
        const container = new Control(this.node, 'div', 'container');
        const startBtn = new Control<HTMLButtonElement>(container.node, 'button', '', 'Начать');
        startBtn.node.onclick = () => this.onAudiogame();
        const backBtn = new Control<HTMLButtonElement>(container.node, 'button', '', 'Назад');
        backBtn.node.onclick = () => this.onStartPage();
    }
}
