export class Barriers {
  constructor(gameArea) {
    this.gameArea = gameArea;
    this.currentPosition = -90;
    this.barrierMoveInterval = null;

    this.topBarrier = null;
    this.topBarrierHeight = null;

    this.bottomBarrier = null;
    this.bottomBarrierHeight = null;

    this.passed = false;
    this.cleaned = false;
  }

  randHeight(maxHeight) {
    return Math.floor(Math.random() * maxHeight);
  }

  createBarrier() {
    this.topBarrierHeight = this.randHeight(600);
    this.bottomBarrierHeight = window.innerHeight * 0.95 - this.topBarrierHeight - 180;
    this.bottomBarrier = document.createElement("div");
    this.topBarrier = document.createElement("div");

    this.bottomBarrier.style.height = `${this.bottomBarrierHeight}px`;
    this.topBarrier.style.height = `${this.topBarrierHeight}px`;

    this.bottomBarrier.classList.add("barrier-bottom");
    this.topBarrier.classList.add("barrier-top");

    this.gameArea.appendChild(this.topBarrier);
    this.gameArea.appendChild(this.bottomBarrier);

    this.barrierMove();
  }

  getTopBarrierOffsets() {
    return [
      this.topBarrierHeight,
      this.topBarrier.offsetLeft,
      this.topBarrier.offsetLeft + 90,
      this.bottomBarrierHeight,
      this.bottomBarrier.offsetLeft,
      this.bottomBarrier.offsetLeft + 90,
    ];
  }

  barrierMove() {
    this.barrierMoveInterval = setInterval(() => {
      this.currentPosition += 1;
      this.bottomBarrier.style.right = `${this.currentPosition}px`;
      this.topBarrier.style.right = `${this.currentPosition}px`;
      if (this.currentPosition > window.innerWidth) this.barrierRemove();
    }, 10);
  }

  barrierRemove() {
    this.bottomBarrier.remove();
    this.topBarrier.remove();
  }

  barrierStop() {
    clearInterval(this.barrierMoveInterval);
  }
}
