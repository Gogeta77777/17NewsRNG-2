// 17 News RNG - Main game logic
class NewsRNG {
  constructor() {
    this.targetNumber = 0;
    this.attempts = 0;
    this.maxAttempts = 5;
    this.gameOver = false;
    this.win = false;
  }
  
  init() {
    this.targetNumber = Math.floor(Math.random() * 17) + 1;
    this.attempts = 0;
    this.gameOver = false;
    this.win = false;
    console.log("17 News RNG initialized! Guess a number between 1 and 17.");
  }
  
  guess(number) {
    if (this.gameOver) {
      return { message: "Game over! Refresh to play again.", error: true };
    }
    
    this.attempts++;
    
    if (number === this.targetNumber) {
      this.win = true;
      this.gameOver = true;
      return { 
        message: `🎉 Correct! The news number was ${this.targetNumber}. You won in ${this.attempts} attempts!`,
        win: true
      };
    }
    
    if (this.attempts >= this.maxAttempts) {
      this.gameOver = true;
      return { 
        message: `Game over! The news number was ${this.targetNumber}.`,
        error: true
      };
    }
    
    const hint = number > this.targetNumber ? "lower" : "higher";
    return { 
      message: `Try again! Go ${hint}. ${this.maxAttempts - this.attempts} attempts left.`,
      attempts: this.attempts
    };
  }
}

// Create game instance
const game = new NewsRNG();
game.init();

// Handle messages from the web page
self.onmessage = (e) => {
  const { action, guess } = e.data;
  
  if (action === "guess") {
    const result = game.guess(guess);
    self.postMessage(result);
  } else if (action === "reset") {
    game.init();
    self.postMessage({ message: "Game reset! Guess a number between 1 and 17." });
  }
};

console.log("17 News RNG Worker ready!");
