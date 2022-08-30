class Bird {

  private readonly bird: HTMLElement;
  private readonly startPosition: number;
  private positionY: number;
  birdOffsrtTop: number;
  birdOffsrtBottom: number;
  birdOffsetLeft: number;
  birdOffsetRight: number;
  animationTo: any;
  fallingSpeed: number;
  flapHeight: number;
  
  constructor() {
    this.bird = document.querySelector(".bird")!;
    
    this.startPosition = Math.floor(window.innerHeight * 0.5);
    this.positionY = this.startPosition;
    
    this.birdOffsrtTop = 0;
    this.birdOffsrtBottom = 0;
    this.birdOffsetLeft = 0;
    this.birdOffsetRight = 0;
    
    this.animationTo = 0;
    this.fallingSpeed = 4;
    this.flapHeight = window.innerHeight * 0.3;
  }
  
  startFalling() {
    this.positionY += this.fallingSpeed;
    this.bird.style.top = `${this.positionY}px`;
  }
  
  removeAnimation() {
    this.bird.classList.remove("bird--animate");
  }
  
  tracBirdPosition() {
    const heightOffsrtCorrect = this.bird.clientHeight * 0.3;
    const widthOffsrtCorrect = this.bird.clientWidth * 0.3;

    this.birdOffsrtTop = this.bird.offsetTop + heightOffsrtCorrect;
    this.birdOffsrtBottom = this.bird.offsetTop + this.bird.clientHeight - heightOffsrtCorrect;
    this.birdOffsetLeft = this.bird.offsetLeft + widthOffsrtCorrect;
    this.birdOffsetRight = this.bird.offsetLeft + this.bird.clientWidth - widthOffsrtCorrect;
  }

  restartBirdPosition() {
    this.positionY = this.startPosition;
    this.bird.style.top = `${this.positionY}`;
  }

  flap() {
    this.positionY -= this.flapHeight;
    this.bird.style.top = `${this.positionY}`;

    this.bird.classList.add("bird-flap");

    this.animationTo = setTimeout(() => {
      this.bird.classList.remove("bird-flap");

      clearTimeout(this.animationTo);
    }, 500);
  }
}

export const bird = new Bird();
