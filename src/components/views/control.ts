export class Control<HTMLElementType extends HTMLElement = HTMLElement> {
    node: HTMLElementType;

    constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', textContent = '') {
        this.node = document.createElement(tagName) as HTMLElementType;
        this.node.className = className;
        this.node.textContent = textContent;
        if (parentNode) {
            parentNode.append(this.node);
        }
    }

    destroy(): void {
        this.node.remove();
    }
}
