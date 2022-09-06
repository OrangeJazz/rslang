import { Word } from '../../../../types';
import { Control } from '../../../control';
import './game-field.scss';

export class AudiogameField extends Control {
    onAudioPlay!: (audioNode: HTMLAudioElement) => void;
    onAudiogameField!: () => void;
    onAudiogameResult!: () => void;
    getNoAnswer!: () => void;
    getAnswer!: (word: Word) => void;
    checkNextPage!: () => boolean;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main audiogame-field');
    }

    renderAudioContainer(parentNode: HTMLElement, word: Word): void {
        const container = new Control(parentNode, 'div', 'audiogame-card__audio-container');
        const audio = new Control<HTMLAudioElement>(container.node, 'audio');
        audio.node.src = word.audio;
        const button = new Control<HTMLButtonElement>(container.node, 'button', 'audiogame-card__audio-button');
        button.node.type = 'button';
        this.addAudioButtonListeners(audio.node, button.node);
        audio.node.play();
    }

    addAudioButtonListeners(audioNode: HTMLAudioElement, buttonNode: HTMLButtonElement): void {
        buttonNode.onclick = () => this.onAudioPlay(audioNode);
        audioNode.onplay = () => buttonNode.classList.add('audiogame-card__audio-button_playing');
        audioNode.onpause = () => buttonNode.classList.remove('audiogame-card__audio-button_playing');
        window.addEventListener('keydown', (e) => {
            const keyCode = e.key;
            if (keyCode === 'Enter') {
                this.onAudioPlay(audioNode);
            }
        });
    }

    renderGameCard(word: Word, answersList: Word[]) {
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'audiogame-card__wrapper audiogame');
        new Control(wrapper.node, 'h2', 'audiogame-card__heading', 'Как переводится слово?');
        this.renderAudioContainer(wrapper.node, word);
        const answers = new Control(wrapper.node, 'div', 'audiogame-card__answers');
        answersList.map((item, i) => {
            const answerBtn = new Control(
                answers.node,
                'button',
                'audiogame-card__answer btn',
                `${i + 1}. ${item.wordTranslate}`
            );
            answerBtn.node.onclick = () => {
                this.getAnswer(item);
                this.checkNextPage() ? this.onAudiogameField() : this.onAudiogameResult();
            };
        });
        const noAnswerBtn = new Control<HTMLButtonElement>(
            wrapper.node,
            'button',
            'audiogame-card__answer_no btn',
            `Не знаю`
        );
        noAnswerBtn.node.type = 'button';
        noAnswerBtn.node.onclick = () => {
            this.getNoAnswer();
            this.checkNextPage() ? this.onAudiogameField() : this.onAudiogameResult();
        };
    }
}
