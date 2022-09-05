import { Word } from '../../../../types';
import { Control } from '../../../control';
import { Card } from '../../textbook/card/card';
import './game-result.scss';

export class AudiogameResult extends Control {
    onAudiogameResult!: () => void;
    onAudiogameField!: () => void;
    getResult!: () => number;
    onAudioPlay!: (audioNode: HTMLAudioElement) => void;
    mistakes: Control<HTMLElement>;
    learnWords: Control<HTMLElement>;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main audiogame-result');
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'audiogame-result__wrapper');
        new Control(wrapper.node, 'h2', 'audiogame-result__heading', 'Игра завершена!');
        // new Control(wrapper.node, 'h3', 'game__result', `Ваш результат: ${this.getResult()} из 20`);
        new Control(wrapper.node, 'h5', 'audiogame-result__text', `Выученные слова:`);
        this.learnWords = new Control(wrapper.node, 'div', 'audiogame-result__words-container');
        new Control(this.learnWords.node, 'p', 'textbook__preloading', 'Слова загружаются...');
        new Control(wrapper.node, 'h5', 'audiogame-result__text', `Ошибки:`);
        this.mistakes = new Control(wrapper.node, 'div', 'audiogame-result__words-container');
        new Control(this.mistakes.node, 'p', 'textbook__preloading', 'Слова загружаются...');
    }

    renderCards(words: Set<Word>, parentNode: Control): void {
        parentNode.node.innerHTML = '';
        words.forEach((word) => {
            const card = new Card(parentNode.node, word);
            card.onAudioPlay = (audioNode: HTMLAudioElement) => {
                this.onAudioPlay(audioNode);
            };
        });
    }
}
