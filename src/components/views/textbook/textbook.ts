import { Word } from '../../types';
import { Control } from '../control';

export class Textbook extends Control {
    groupNumber: number;
    pageNumber: number;
    words!: Word[];
    onLoadWords!: (groupNumber: number, pageNumber: number) => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main');
        this.groupNumber = 1;
        this.pageNumber = 1;
        new Control(this.node, 'h2', '', 'Учебник');
        const button = new Control<HTMLButtonElement>(this.node, 'button', '', 'Загрузить слова');
        button.node.type = 'button';
        button.node.onclick = () => this.onLoadWords(this.groupNumber, this.pageNumber);
    }

    render() {
        new Control(this.node, 'h2', '', 'Учебник');
        this.node.innerHTML = this.words.map((word) => `<div>${word.word}</div>`).join('');
        const button = new Control<HTMLButtonElement>(this.node, 'button', '', 'Еще слова!');
        button.node.type = 'button';
        button.node.onclick = () => this.onLoadWords(++this.groupNumber, ++this.pageNumber);
    }
}
