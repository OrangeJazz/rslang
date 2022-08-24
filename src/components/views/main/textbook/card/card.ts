import { Word } from '../../../../types';
import { Control } from '../../../control';

import './card.scss';

export class Card extends Control {
    constructor(parentNode: HTMLElement, word: Word) {
        super(parentNode, 'article', 'card');
        new Control(this.node, 'div', 'card__img', word.image);
        const textContainer = new Control(this.node, 'div', 'card__text-container');

        const wordContainer = new Control(textContainer.node, 'div', 'card__word-container');
        new Control(wordContainer.node, 'span', 'card__word', word.word);
        new Control(wordContainer.node, 'span', 'card__transcription', word.transcription);
        new Control(wordContainer.node, 'span', 'card__word-translate', word.wordTranslate);

        const textMeaningContainer = new Control(textContainer.node, 'div', 'card__text-meaning-container');
        const textMeaningElement = new Control(textMeaningContainer.node, 'p', 'card__text-meaning');
        textMeaningElement.node.innerHTML = word.textMeaning;
        new Control(textMeaningContainer.node, 'p', 'card__text-meaning-translate', word.textMeaningTranslate);

        const textExampleContainer = new Control(textContainer.node, 'div', 'card__text-example-container');
        const textExampleElement = new Control(textExampleContainer.node, 'p', 'card__text-example');
        textExampleElement.node.innerHTML = word.textExample;
        new Control(textExampleContainer.node, 'p', 'card__text-example-translate', word.textExampleTranslate);
    }
}
