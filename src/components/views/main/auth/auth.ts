import { Control } from '../../control';
import './auth.scss';

export enum AuthPageType {
    login = 'login',
    register = 'register',
}

enum InputEnum {
    name = 'name',
    email = 'email',
    password = 'password',
}

enum PlaceholderEnum {
    name = 'Введите имя',
    email = 'Введите e-mail',
    password = 'Введите пароль',
}

export class Auth extends Control {
    onStartPage!: () => void;
    onLogin!: () => void;
    onRegister!: () => void;
    auth!: () => void;
    type: AuthPageType;

    constructor(parentNode: HTMLElement, type: AuthPageType) {
        super(parentNode, 'main', 'main auth');
        this.type = type;
        const container = new Control(this.node, 'div', 'container');
        new Control(
            container.node,
            'h2',
            'auth__title',
            `${this.type === AuthPageType.register ? 'Добро пожаловать!' : 'Рады видеть!'}`
        );
        const form = new Control(container.node, 'form', 'auth__form form');
        this.renderInputs(form.node);
        new Control(
            form.node,
            'button',
            'form__button',
            `${this.type === AuthPageType.register ? 'Зарегистрироваться' : 'Войти'}`
        );
        const text = new Control(
            container.node,
            'p',
            'form__text',
            `${this.type === AuthPageType.register ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'}\u00A0`
        );
        const link = new Control<HTMLAnchorElement>(
            text.node,
            'a',
            'form__link',
            `${this.type === AuthPageType.register ? 'Войти' : 'Регистрация'}`
        );
        link.node.onclick = () => (this.type === AuthPageType.register ? this.onLogin() : this.onRegister());
        link.node.href = '#';
    }

    renderInputs(parentNode: HTMLElement): void {
        const container = new Control(parentNode, 'div', 'form__inputs-wrapper');
        if (this.type === AuthPageType.register) {
            this.renderInput(container.node, InputEnum.name);
        }
        this.renderInput(container.node, InputEnum.email);
        this.renderInput(container.node, InputEnum.password);
    }

    renderInput(container: HTMLElement, type: InputEnum): void {
        const input = new Control<HTMLInputElement>(container, 'input', 'form__input');
        input.node.required = true;
        input.node.placeholder = PlaceholderEnum[type];
        input.node.name = `${type}`;
        switch (type) {
            case InputEnum.email: {
                input.node.type = 'email';
                break;
            }
            case InputEnum.password: {
                input.node.type = 'password';
                input.node.minLength = 8;
                break;
            }
            default: {
                input.node.type = 'text';
            }
        }
    }
}
