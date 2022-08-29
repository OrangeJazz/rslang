import { Word } from '../../../types';
import { Control } from '../../control';
import { Card } from './card/card';

import './textbook.scss';

const FIRST_PAGE_NUMBER = 0;
const LAST_PAGE_NUMBER = 29;

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
    groupButtons!: Control<HTMLButtonElement>[];
    cards: Control;
    pageButtons!: PageButtons;
    pageNumberControl!: Control;
    onNewWordsPage!: (groupNumber: number, pageNumber: number) => void;
    onAudioPlay!: (audioNode: HTMLAudioElement) => void;

    constructor(parentNode: HTMLElement, groupNumber = 0, pageNumber = 0) {
        super(parentNode, 'main', 'main textbook');
        this.groupNumber = groupNumber;
        this.pageNumber = pageNumber;

        const container = new Control(this.node, 'div', 'container textbook__container');

        new Control(container.node, 'h2', 'textbook__heading', 'Учебник');
        this.renderGroupButtons(container.node);
        this.cards = new Control(container.node, 'div', 'textbook__cards');
        new Control(this.cards.node, 'p', 'textbook__preloading', 'Слова загружаются...');
        this.renderPageButtons(container.node);
    }

    renderGroupButtons(parentNode: HTMLElement): void {
        const buttons = new Control(parentNode, 'div', 'textbook__group-buttons');
        const activeButtonClass = 'textbook__group-button_active';
        this.groupButtons = [];

        for (let i = 0; i < 6; i += 1) {
            const button = new Control<HTMLButtonElement>(
                buttons.node,
                'button',
                'textbook__group-button',
                `Раздел ${i + 1}`
            );
            button.node.type = 'button';
            button.node.style.backgroundColor = `rgb(255, ${220 - i * 20}, ${220 - i * 20})`;
            button.node.onclick = () => {
                this.groupButtons.forEach((groupButton, j) => {
                    if (i == j) {
                        groupButton.node.classList.add(activeButtonClass);
                    } else {
                        groupButton.node.classList.remove(activeButtonClass);
                    }
                });
                this.onNewWordsPage(i, 0);
            };
            this.groupButtons.push(button);
        }

        this.groupButtons[this.groupNumber].node.classList.add(activeButtonClass);
    }

    renderPageButtons(parentNode: HTMLElement): void {
        const buttons = new Control(parentNode, 'div', 'textbook__page-buttons');
        this.pageButtons = {
            first: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '<<'),
            previous: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '<'),
            currentPage: new Control(buttons.node, 'span', 'textbook__page-number'),
            next: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '>'),
            last: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '>>'),
        };

        this.pageButtons.first.node.onclick = () => {
            this.pageNumber = FIRST_PAGE_NUMBER;
            this.onNewWordsPage(this.groupNumber, this.pageNumber);
            this.updatePageButtonsDisabledAttribute();
        };
        this.pageButtons.previous.node.onclick = () => {
            this.pageNumber -= 1;
            this.onNewWordsPage(this.groupNumber, this.pageNumber);
            this.updatePageButtonsDisabledAttribute();
        };
        this.pageButtons.next.node.onclick = () => {
            this.pageNumber += 1;
            this.onNewWordsPage(this.groupNumber, this.pageNumber);
            this.updatePageButtonsDisabledAttribute();
        };
        this.pageButtons.last.node.onclick = () => {
            this.pageNumber = LAST_PAGE_NUMBER;
            this.onNewWordsPage(this.groupNumber, this.pageNumber);
            this.updatePageButtonsDisabledAttribute();
        };

        this.updateCurrentPageElement();
        this.updatePageButtonsDisabledAttribute();
    }

    updateCurrentPageElement(): void {
        this.pageButtons.currentPage.node.textContent = `Страница ${this.pageNumber + 1} из 30`;
    }

    updatePageButtonsDisabledAttribute() {
        if (this.pageNumber === FIRST_PAGE_NUMBER) {
            this.pageButtons.first.node.disabled = true;
            this.pageButtons.previous.node.disabled = true;
            this.pageButtons.next.node.disabled = false;
            this.pageButtons.last.node.disabled = false;
        } else if (this.pageNumber === LAST_PAGE_NUMBER) {
            this.pageButtons.first.node.disabled = false;
            this.pageButtons.previous.node.disabled = false;
            this.pageButtons.last.node.disabled = true;
            this.pageButtons.next.node.disabled = true;
        } else {
            this.pageButtons.first.node.disabled = false;
            this.pageButtons.previous.node.disabled = false;
            this.pageButtons.next.node.disabled = false;
            this.pageButtons.last.node.disabled = false;
        }
    }

    renderCards(words: Word[]): void {
        this.cards.node.innerHTML = '';
        words.forEach((word) => {
            const card = new Card(this.cards.node, word);
            card.onAudioPlay = (audioNode) => {
                this.onAudioPlay(audioNode);
            };
        });
        this.updateCurrentPageElement();
    }
}
