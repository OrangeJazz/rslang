import { Control } from '../../../control';
import { HeroLogo } from '../logo/logo';
import './hero.scss';
import { api } from '../../../../controllers/api';

export class Hero extends Control {
    onTextbook!: () => void;
    name: string | undefined;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'section', 'hero');
        this.getUserInfo();
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'hero__wrapper');
        const leftDiv = new Control(wrapper.node, 'div', 'hero__img-container_left');
        const leftImg = new Control<HTMLImageElement>(leftDiv.node, 'img', 'hero__img hero__img_left');
        leftImg.node.src = './img/photo1.jpg';
        leftImg.node.alt = 'photo1';
        const centralDiv = new Control(wrapper.node, 'div', 'hero__content');
        new HeroLogo(centralDiv.node);
        new Control(centralDiv.node, 'h1', '', 'Учи английский играя');
        new Control(centralDiv.node, 'p', '', 'Образовательная онлайн-платформа изучения английского языка');

        const button = new Control<HTMLButtonElement>(
            centralDiv.node,
            'button',
            'btn btn_secondary btn_animated',
            'Начать'
        );
        button.node.type = 'button';
        button.node.onclick = () => this.onTextbook();

        const rightDiv = new Control(wrapper.node, 'div', 'hero__img-container_right');
        const rightImg = new Control<HTMLImageElement>(rightDiv.node, 'img', 'hero__img hero__img_right');
        rightImg.node.src = './img/photo2.jpg';
        rightImg.node.alt = 'photo2';
    }

    getUserInfo = async () => {
        if (localStorage.getItem('userId')) {
            const userData = await api.getUserInfo();
            this.name = userData.name;
            const title = document.querySelector('h1') as HTMLHeadingElement;
            title.textContent = title.textContent + `, ${this.name}!`;
        }
    };
}
