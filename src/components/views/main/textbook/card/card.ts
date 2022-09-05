import { Word } from '../../../../types';
import { Control } from '../../../control';

import './card.scss';

export class Card extends Control {
    onAudioPlay!: (audioNode: HTMLAudioElement) => void;
    constructor(parentNode: HTMLElement, word: Word) {
        super(parentNode, 'article', 'card');
        this.node.style.backgroundImage = `linear-gradient(105deg, transparent 0%, transparent 25%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.75) 50%), url(${word.image})`;
        const textContainer = new Control(this.node, 'div', 'card__audio-and-text-container');
        this.renderWordContainer(textContainer.node, word);
        this.renderTextMeaningContainer(textContainer.node, word);
        this.renderTextExampleContainer(textContainer.node, word);
    }

    renderWordContainer(parentNode: HTMLElement, word: Word): void {
        const container = new Control(parentNode, 'div', 'card__word-container');
        const audio = new Control<HTMLAudioElement>(container.node, 'audio');
        audio.node.src = word.audio;

        const button = new Control<HTMLButtonElement>(container.node, 'button', 'card__audio-button');
        button.node.type = 'button';
        this.addAudioButtonListeners(audio.node, button.node);
        const wordContainer = new Control(container.node, 'div', 'card__word-main-container');

        new Control(wordContainer.node, 'span', 'card__word', word.word);
        new Control(wordContainer.node, 'span', 'card__transcription', word.transcription);
        new Control(wordContainer.node, 'span', 'card__word-translate', word.wordTranslate);
    }

    renderTextMeaningContainer(parentNode: HTMLElement, word: Word): void {
        const container = new Control(parentNode, 'div', 'card__text-meaning-container');
        const audio = new Control<HTMLAudioElement>(container.node, 'audio');
        audio.node.src = word.audioMeaning;

        const button = new Control<HTMLButtonElement>(container.node, 'button', 'card__audio-button');
        button.node.type = 'button';
        this.addAudioButtonListeners(audio.node, button.node);

        const textContainer = new Control(container.node, 'div', 'card__text-container');
        const textMeaningElement = new Control(textContainer.node, 'p', 'card__text-meaning');
        textMeaningElement.node.innerHTML = word.textMeaning;
        new Control(textContainer.node, 'p', 'card__text-meaning-translate', word.textMeaningTranslate);
    }

    renderTextExampleContainer(parentNode: HTMLElement, word: Word): void {
        const container = new Control(parentNode, 'div', 'card__text-example-container');
        const audio = new Control<HTMLAudioElement>(container.node, 'audio');
        audio.node.src = word.audioExample;

        const button = new Control<HTMLButtonElement>(container.node, 'button', 'card__audio-button');
        button.node.type = 'button';
        this.addAudioButtonListeners(audio.node, button.node);

        const textContainer = new Control(container.node, 'div', 'card__text-container');
        const textExampleElement = new Control(textContainer.node, 'p', 'card__text-example');
        textExampleElement.node.innerHTML = word.textExample;
        new Control(textContainer.node, 'p', 'card__text-example-translate', word.textExampleTranslate);
    }

    addAudioButtonListeners(audioNode: HTMLAudioElement, buttonNode: HTMLButtonElement): void {
        buttonNode.onclick = () => this.onAudioPlay(audioNode);
        // {
        //     if (audioNode.paused) {
        //         audioNode.play();
        //     } else {
        //         audioNode.pause();
        //     }
        // };
        audioNode.onplay = () => buttonNode.classList.add('card__audio-button_playing');
        audioNode.onpause = () => buttonNode.classList.remove('card__audio-button_playing');
    }
}
