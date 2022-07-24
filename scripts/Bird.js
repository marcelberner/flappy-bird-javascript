export class Bird {
  constructor(element, positionY) {
    this.element = element;
    this.positionY = positionY;
  }

  startFalling() {
    this.positionY += 1;
    this.element.style.top = `${this.positionY}px`;
  }

  removeAnimation() {
    this.element.classList.remove("temporary-animation");
  }

  flap() {
    this.positionY -= 150;
    this.element.style.top = `${this.positionY}px`;
  }
}
