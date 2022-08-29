export class AudioManager {
    currentAudioNode: HTMLAudioElement | undefined;

    constructor() {
        this.currentAudioNode = undefined;
    }

    handle(audioNode: HTMLAudioElement): void {
        if (!this.currentAudioNode) {
            this.currentAudioNode = audioNode;
            this.currentAudioNode.play();
        } else if (audioNode !== this.currentAudioNode) {
            this.currentAudioNode.pause();
            this.currentAudioNode.currentTime = 0;
            this.currentAudioNode = audioNode;
            this.currentAudioNode.play();
        } else if (this.currentAudioNode.paused) {
            this.currentAudioNode.play();
        } else {
            this.currentAudioNode.pause();
            this.currentAudioNode.currentTime = 0;
        }
    }
}
