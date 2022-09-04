import { Word } from '../../../../types';
import { Control } from '../../../control';
import './game-field.scss';

export class AudiogameField extends Control {
    onAudioPlay!: (audioNode: HTMLAudioElement) => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main audiogame-field');
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'audiogame__wrapper audiogame');
        // this.renderAudioContainer(wrapper.node, word);
        const answers = new Control(wrapper.node, 'div', 'answers');
        const answersList = [1, 2, 3, 4];
        answersList.map((item) => {
            new Control(answers.node, 'button', '', item.toString());
        });
        new Control<HTMLButtonElement>(wrapper.node, 'button', 'btn', 'Не знаю');
    }

    renderAudioContainer(parentNode: HTMLElement, word: Word): void {
        const container = new Control(parentNode, 'div', 'audiogame__audio-container');
        const audio = new Control<HTMLAudioElement>(container.node, 'audio');
        audio.node.src = word.audioExample;
        const button = new Control<HTMLButtonElement>(container.node, 'button', 'audiogame__audio-button');
        button.node.type = 'button';
        this.addAudioButtonListeners(audio.node, button.node);
    }

    addAudioButtonListeners(audioNode: HTMLAudioElement, buttonNode: HTMLButtonElement): void {
        buttonNode.onclick = () => this.onAudioPlay(audioNode);
        audioNode.onplay = () => buttonNode.classList.add('audiogame__audio-button_playing');
        audioNode.onpause = () => buttonNode.classList.remove('audiogame__audio-button_playing');
    }
}
