import { Word } from '../../../types';
import { Control } from '../../control';
import { Card } from './card/card';

import './textbook.scss';

interface PageButtons {
    first: Control<HTMLButtonElement>;
    previous: Control<HTMLButtonElement>;
    currentPage: Control;
    next: Control<HTMLButtonElement>;
    last: Control<HTMLButtonElement>;
}

export class Textbook extends Control {
    groupNumber: number;
    pageNumber: number;
    cards: Control;
    pageButtons!: PageButtons;
    pageNumberControl!: Control;
    onNewWordsPage!: (groupNumber: number, pageNumber: number) => void;

    constructor(parentNode: HTMLElement, groupNumber = 0, pageNumber = 0) {
        super(parentNode, 'main', 'main textbook');
        this.groupNumber = groupNumber;
        this.pageNumber = pageNumber;

        const container = new Control(this.node, 'div', 'container');

        new Control(container.node, 'h2', 'textbook__heading', 'Учебник');
        this.cards = new Control(container.node, 'div', 'textbook__cards');
        new Control(this.cards.node, 'p', 'textbook__preloading', 'Слова загружаются...');
        this.renderPageButtons();
    }

    renderPageButtons() {
        const buttons = new Control(this.cards.node.parentElement, 'div', 'textbook__page-buttons');
        this.pageButtons = {
            first: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '<<'),
            previous: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '<'),
            currentPage: new Control(buttons.node, 'span', 'textbook__page-number'),
            next: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '>'),
            last: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '>>'),
        };

        this.pageButtons.first.node.onclick = () => {
            this.pageNumber = 0;
            this.onNewWordsPage(this.groupNumber, this.pageNumber);
        };
        this.pageButtons.previous.node.onclick = () => this.onNewWordsPage(this.groupNumber, --this.pageNumber);
        this.pageButtons.next.node.onclick = () => this.onNewWordsPage(this.groupNumber, ++this.pageNumber);
        this.pageButtons.last.node.onclick = () => {
            this.pageNumber = 29;
            this.onNewWordsPage(this.groupNumber, this.pageNumber);
        };

        this.updateCurrentPageElement();
    }

    updateCurrentPageElement() {
        this.pageButtons.currentPage.node.textContent = `Страница ${this.pageNumber + 1}`;
    }

    renderCards(words: Word[]) {
        this.cards.node.innerHTML = '';
        words.forEach((word) => {
            new Card(this.cards.node, word);
        });
        this.updateCurrentPageElement();
    }
}
