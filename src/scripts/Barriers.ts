import { game } from "../app";

export default class Barriers {

  private topBarrier!: HTMLElement;
  private bottomBarrier!: HTMLElement;
  private currentPosition: number;
  private topBarrierHeight!: number;
  private bottomBarrierHeight!: number;
  private barrierSpeedMove: number;
  private readonly windowSize: number;
  private readonly maxbarrierHeight: number;
  passed: boolean;
  
  constructor() {
    this.currentPosition = -150;
    this.barrierSpeedMove = 3;

    this.windowSize = window.innerHeight * 0.245;
    this.maxbarrierHeight = 500;
    
    this.topBarrier;
    this.topBarrierHeight;
    
    this.bottomBarrier;
    this.bottomBarrierHeight;

    this.passed = false;
  }

  private randHeight(maxHeight: number) {
    return Math.floor(Math.random() * maxHeight);
  }

  createBarrier() {
    this.topBarrierHeight = this.randHeight(this.maxbarrierHeight);
    this.bottomBarrierHeight = window.innerHeight - this.topBarrierHeight - this.windowSize;
    this.bottomBarrier = document.createElement("div");
    this.topBarrier = document.createElement("div");

    this.bottomBarrier.style.height = `${this.bottomBarrierHeight}px`;
    this.topBarrier.style.height = `${this.topBarrierHeight}px`;

    this.bottomBarrier.classList.add("barrier", "barrier--bottom");
    this.topBarrier.classList.add("barrier", "barrier--top");

    game.gameArea.appendChild(this.topBarrier);
    game.gameArea.appendChild(this.bottomBarrier);

    this.barrierMove();
  }

  getTopBarrierOffsets() {
    return{ 
      barrierTopOffset: this.topBarrierHeight,
      barrierOffsetLeft: this.topBarrier!.offsetLeft,
      barrierOffsetRight: this.topBarrier!.offsetLeft + this.topBarrier?.clientWidth!,
      barrierBottomOffset: window.innerHeight - this.bottomBarrierHeight!,
    };
  }

  private barrierMove() {
    this.currentPosition += this.barrierSpeedMove;
    this.bottomBarrier!.style.right = `${this.currentPosition}px`;
    this.topBarrier!.style.right = `${this.currentPosition}px`;

    if (this.currentPosition > window.innerWidth) this.barrierRemove();
    if (game.isLive) requestAnimationFrame(this.barrierMove.bind(this));
  }

  barrierRemove() {
    this.bottomBarrier!.remove();
    this.topBarrier!.remove();
  }
}
