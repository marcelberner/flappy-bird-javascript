import Barriers from "./Barriers";
import { bird } from "./Bird";
import { modal } from "./Modal";

export default class Game {

  readonly gameArea: HTMLElement;
  private readonly ground: HTMLElement;
  private isGameStarted: boolean;
  private barriersArray: Barriers[];
  private barrierIndex: number;
  private backgroundPosition: number;
  private backgroundSpeed: number;
  private barriersSpawnTime: number;
  isLive: boolean;
  
  constructor() {
    this.gameArea = document.querySelector(".game")!;
    this.ground = document.querySelector(".ground")!;

    this.isGameStarted = false;
    this.isLive = true;

    this.barriersSpawnTime = performance.now();
    this.barriersArray = [];
    this.barrierIndex = 0;

    this.backgroundPosition = 0;
    this.backgroundSpeed = 4;
    
    this.backgroundMove();
  }

  init() {
    window.addEventListener("click", () => {
      if (!this.isGameStarted) this.startGame();

      if (this.isLive) bird.flap();
      else this.restartGame();
    });

    window.addEventListener("keypress", event => {
      if (event.keyCode === 32) {
        if (!this.isGameStarted) this.startGame();
        
        if (this.isLive) bird.flap();
        else this.restartGame();
      }
    });
  }

  private startGame() {
    modal.changeMainMenuVisibility();
    modal.changeScoreVisibility();
    bird.removeAnimation();

    this.setIntervals();
    this.barriersSpawn();

    this.isGameStarted = true;
  }
  
  private restartGame() {
    this.isLive = true;

    bird.restartBirdPosition();
    modal.changeEndGameVisibility();
    modal.changeScoreVisibility();
    modal.resetScore();

    this.barriersArray.forEach(barrier => barrier.barrierRemove());
    this.barriersArray = [];
    this.barrierIndex = 0;

    this.barriersSpawn();
    this.setIntervals();
    this.backgroundMove();
  }
  
  private setIntervals() {
    bird.startFalling();
    bird.tracBirdPosition();

    this.tracColiision();
    this.trackScore();
    this.trackBarrierClean();

    if (this.isLive) requestAnimationFrame(this.setIntervals.bind(this));
  }

  private backgroundMove() {
    this.backgroundPosition += this.backgroundSpeed;

    this.gameArea.style.backgroundPositionX = `-${this.backgroundPosition}px`;
    this.ground.style.backgroundPositionX = `-${this.backgroundPosition}px`;

    if (this.isLive) requestAnimationFrame(this.backgroundMove.bind(this));
  }

  private barriersSpawn(currentTime?: number) {
    if (currentTime! - this.barriersSpawnTime > 16) {
      this.barriersSpawnTime = currentTime!;

      this.barriersArray.push(new Barriers());
      this.barriersArray[this.barrierIndex].createBarrier();

      this.barrierIndex++;
      this.barriersSpawnTime += 5000;
    }

    if (this.isLive) requestAnimationFrame(this.barriersSpawn.bind(this));
  }

  private tracColiision() {
    const isHitedByGround = bird.birdOffsrtBottom > window.innerHeight - this.ground.clientHeight;
    const isHitedByCelling = bird.birdOffsrtTop < 0;

    this.barriersArray.forEach(barrier => {
      const barrierOffsets = barrier.getTopBarrierOffsets();

      const topOffsetsCrossed =
        bird.birdOffsrtTop < barrierOffsets.barrierTopOffset!;
      const bottomOffsetsCrossed =
        bird.birdOffsrtBottom > barrierOffsets.barrierBottomOffset!;
      const rightOffsetsCrossed =
        bird.birdOffsetRight > barrierOffsets.barrierOffsetLeft!;
      const leftOffsetsCrossed =
        bird.birdOffsetLeft < barrierOffsets.barrierOffsetRight;
      const sameOffsetsCrossed =
        bird.birdOffsetLeft > barrierOffsets.barrierOffsetLeft;

      if (
        (topOffsetsCrossed && rightOffsetsCrossed && leftOffsetsCrossed) ||
        (topOffsetsCrossed && sameOffsetsCrossed && leftOffsetsCrossed) ||
        (bottomOffsetsCrossed && rightOffsetsCrossed && leftOffsetsCrossed) ||
        (bottomOffsetsCrossed && sameOffsetsCrossed && leftOffsetsCrossed)
      ) this.endgame();
    });

    if (isHitedByCelling || isHitedByGround) this.endgame();
  }

  private trackScore() {
    this.barriersArray.forEach(barrier => {
      const barrierOffsets = barrier.getTopBarrierOffsets();
      const birdPassed = bird.birdOffsetLeft > barrierOffsets.barrierOffsetRight;

      if (!barrier.passed && birdPassed) {
        modal.increseScore();
        barrier.passed = true;
      }
    });
  }

  private trackBarrierClean() {
    this.barriersArray.forEach((barrier, index) => {
      const barrierOffsets = barrier.getTopBarrierOffsets();
      const barrierOut = barrierOffsets.barrierOffsetRight < 0;

      if (barrierOut) {
        this.barrierIndex--;
        this.barriersArray.splice(index, 1);
      }
    });
  }

  private endgame() {
    this.isLive = false;

    modal.checkRecord();
    modal.changeEndGameVisibility();
    modal.changeScoreVisibility();
  }
}
