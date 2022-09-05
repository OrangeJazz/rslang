import { Control } from '../../../control';
import './audiogame-start.scss';

export class AudiogameStart extends Control {
    onAudiogameField!: () => void;
    startGame!: () => void;
    onStartPage!: () => void;
    setLevel!: (seletedIndex: number) => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main  audiogame');
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'audiogame__wrapper');
        new Control(wrapper.node, 'h2', 'game__heading', 'Аудиовызов');
        const img = new Control<HTMLImageElement>(wrapper.node, 'img', 'game__img');
        img.node.alt = 'аудиовызов';
        img.node.src = './img/listen.png';
        new Control(wrapper.node, 'p', 'game__text', 'Игра улучшает восприятие речи на слух.');
        const form = new Control(wrapper.node, 'div', 'form game__form');
        new Control(form.node, 'h3', 'form__heading', 'Выберите уровень сложности');
        const select = new Control<HTMLSelectElement>(form.node, 'select', 'form__select');
        const categoriesList = [
            'A1 - Elementary',
            'A2 - Pre-Intermediate',
            'B1 - Intermediate',
            'B2 - Upper-Intermediate',
            'C1 - Advanced',
            'C2 - Proficiency',
        ];
        categoriesList.map((item) => {
            const option = new Control<HTMLOptionElement>(select.node, 'option', '', item.toString());
            option.node.value = item.toString();
        });
        select.node.onchange = () => this.setLevel(select.node.selectedIndex);

        const startBtn = new Control<HTMLButtonElement>(wrapper.node, 'button', 'btn game__btn', 'Начать');
        startBtn.node.onclick = () => {
            this.startGame();
            this.onAudiogameField();
        };
    }
}
