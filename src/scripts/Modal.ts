class Modal {

  private readonly menuModal: HTMLElement;
  private readonly overModal: HTMLElement;
  private readonly scoreText: HTMLElement;
  private readonly finalScore: HTMLElement;
  private readonly bestScore: HTMLElement;
  score: number;

  constructor() {
    this.menuModal = document.querySelector(".modal--menu")!;
    this.overModal = document.querySelector(".modal--over")!;
    this.scoreText = document.querySelector(".score")!;
    this.finalScore = document.querySelector("[data-final-score]")!;
    this.bestScore = document.querySelector("[data-best-score]")!;
    
    this.score = 0;
  }

  increseScore() {
    this.score++;
    this.updateScore();
  }
  
  checkRecord() {
    const previousRecord = localStorage.getItem("flappy-bird-record");
    
    if (!previousRecord || +previousRecord < this.score)
    localStorage.setItem("flappy-bird-record", this.score.toString());
    
    this.bestScore.textContent = localStorage.getItem("flappy-bird-record");
  }
  
  updateScore() {
    this.finalScore.textContent = this.score.toString();
    this.scoreText.textContent = this.score.toString();
  }

  resetScore() {
    this.score = 0;
    this.updateScore();
  }

  changeMainMenuVisibility() {
    this.menuModal.classList.toggle("hide");
  }

  changeEndGameVisibility() {
    this.overModal.classList.toggle("hide");
  }

  changeScoreVisibility() {
    this.scoreText.classList.toggle("hide");
  }
}

export const modal = new Modal();
