import { Barriers } from "./Barriers.js";
import { Bird } from "./Bird.js";
import { Messages } from "./Messages.js";

class Game {
  constructor(birdPosition) {
    this.birdPosition = birdPosition;
    this.gameStarted = false;
    this.isLive = true;
    this.birdFallingInterval = null;
    this.tracColiisionInterval = null;
    this.barriersSpawnInterval = null;
    this.tracScoreInterval = null;
    this.barrierCleanerInterval = null;
    this.barriersArray = [];
    this.barrierIndex = 0;
  }

  init() {
    window.addEventListener("click", () => {
      this.startGame();
      bird.flap();
    });
    window.addEventListener("keypress", (e) => {
      if (e.keyCode === 32) {
        this.startGame();
        bird.flap();
      }
    });
  }

  startGame() {
    if (!this.gameStarted) {
      messages.changeMainMenuVisibility();
      messages.changeScoreVisibility();
      bird.removeAnimation();
      this.birdFalling();
      this.tracColiision();
      this.barriersSpawn();
      this.trackScore();
      this.barrierCleaner();
      this.gameStarted = true;
    }
  }

  birdFalling() {
    this.birdFallingInterval = setInterval(() => {
      bird.startFalling();
    }, 5);
  }

  barriersSpawn() {
    this.barriersSpawnInterval = setInterval(() => {
      this.barriersArray.push(new Barriers(document.querySelector(".game")));
      this.barriersArray[this.barrierIndex].createBarrier();
      this.barrierIndex++;
    }, 4000);
  }

  tracColiision() {
    this.tracColiisionInterval = setInterval(() => {
      this.barriersArray.forEach((barrier) => {
        const Offsets = barrier.getTopBarrierOffsets();
        if (
          (this.birdPosition.offsetTop <= Offsets[0] &&
            window.innerWidth / 2 - this.birdPosition.offsetLeft >= Offsets[1] &&
            window.innerWidth / 2 - this.birdPosition.offsetLeft <= Offsets[2]) ||
          (window.innerHeight * 0.95 - this.birdPosition.offsetTop <= Offsets[3] &&
            window.innerWidth / 2 - this.birdPosition.offsetLeft > Offsets[4] &&
            window.innerWidth / 2 - this.birdPosition.offsetLeft <= Offsets[5])
        )
          this.endgame();
      });

      if (this.birdPosition.offsetTop >= window.innerHeight * 0.95) this.endgame();
    }, 10);
  }

  trackScore() {
    this.tracScoreInterval = setInterval(() => {
      this.barriersArray.forEach((barrier) => {
        if (!barrier.passed) {
          const Offsets = barrier.getTopBarrierOffsets();
          if (window.innerWidth / 2 - this.birdPosition.offsetLeft >= Offsets[2]) {
            messages.increseScore();
            barrier.passed = true;
          }
        }
      });
    }, 10);
  }

  barrierCleaner() {
    this.barrierCleanerInterval = setInterval(() => {
      this.barriersArray.forEach((barrier, i) => {
        const Offsets = barrier.getTopBarrierOffsets();
        if (Offsets[2] < 0 && !barrier.cleaned) {
          barrier.cleaned = true;
          this.barrierIndex--;
          this.barriersArray.splice(i, 1);
        }
      });
    }, 10);
  }

  endgame() {
    messages.changeEndGameVisibility();
    messages.changeScoreVisibility();
    this.barriersArray.forEach((barrier) => barrier.barrierStop());
    clearInterval(this.birdFallingInterval);
    clearInterval(this.barriersSpawnInterval);
    clearInterval(this.tracColiisionInterval);
    clearInterval(this.tracScoreInterval);
    clearInterval(this.barrierCleanerInterval);
  }
}

const messages = new Messages(
  document.querySelector(".main-menu"),
  document.querySelector(".end-game"),
  document.querySelector(".score"),
  document.querySelector("[data-final-score]")
);

const bird = new Bird(
  document.querySelector(".bird"),
  document.querySelector(".bird").offsetTop + 37
);

const game = new Game(document.querySelector(".bird"));

game.init();
