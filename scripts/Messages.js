export class Messages {
  constructor(mainMenu, endGameMessage, score, finalScore) {
    this.mainMenu = mainMenu;
    this.endGameMessage = endGameMessage;
    this.scoreText = score;
    this.finalScore = finalScore;
    this.score = 0;
  }

  increseScore() {
    this.score++;
    this.finalScore.textContent = this.score;
    this.scoreText.textContent = this.score;
  }

  changeMainMenuVisibility() {
    this.mainMenu.classList.toggle("hide");
  }

  changeEndGameVisibility() {
    this.endGameMessage.classList.toggle("hide");
  }

  changeScoreVisibility() {
    this.scoreText.classList.toggle("hide");
  }
}
