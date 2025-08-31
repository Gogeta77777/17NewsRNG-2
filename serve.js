// Simple HTTP server for Deno Deploy
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>17 News RNG</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background-color: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      text-align: center;
      width: 100%;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 2.5rem;
    }
    .game-info {
      margin-bottom: 25px;
      font-size: 1.2rem;
      color: #7f8c8d;
    }
    .input-group {
      display: flex;
      margin-bottom: 20px;
      gap: 10px;
    }
    input {
      flex: 1;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 18px;
      text-align: center;
    }
    button {
      background: #3498db;
      color: white;
      border: none;
      padding: 15px 25px;
      cursor: pointer;
      border-radius: 8px;
      font-size: 18px;
      transition: all 0.3s;
      font-weight: bold;
    }
    button:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }
    button:disabled {
      background: #95a5a6;
      cursor: not-allowed;
      transform: none;
    }
    .result {
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 25px;
      font-size: 1.2rem;
      font-weight: bold;
    }
    .success {
      background-color: #d4edda;
      color: #155724;
      border: 2px solid #c3e6cb;
    }
    .error {
      background-color: #f8d7da;
      color: #721c24;
      border: 2px solid #f5c6cb;
    }
    .info {
      background-color: #d1ecf1;
      color: #0c5460;
      border: 2px solid #bee5eb;
    }
    .reset-btn {
      background-color: #e74c3c;
      display: block;
      margin: 0 auto;
    }
    .reset-btn:hover {
      background-color: #c0392b;
    }
    .attempts {
      margin-top: 15px;
      font-size: 1rem;
      color: #7f8c8d;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>17 News RNG</h1>
    <div class="game-info">
      Guess the news number between 1 and 17!
    </div>
    <div class="input-group">
      <input type="number" id="guessInput" min="1" max="17" placeholder="Enter guess (1-17)">
      <button id="guessBtn">Submit</button>
    </div>
    <div id="result" class="result"></div>
    <div id="attempts" class="attempts">Attempts: 0/5</div>
    <button id="resetBtn" class="reset-btn">New Game</button>
  </div>

  <script>
    let targetNumber = Math.floor(Math.random() * 17) + 1;
    let attempts = 0;
    const maxAttempts = 5;
    let gameOver = false;

    const guessInput = document.getElementById('guessInput');
    const guessBtn = document.getElementById('guessBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultDiv = document.getElementById('result');
    const attemptsDiv = document.getElementById('attempts');

    function updateGame() {
      attemptsDiv.textContent = \`Attempts: \${attempts}/\${maxAttempts}\`;
      
      if (attempts >= maxAttempts) {
        gameOver = true;
        resultDiv.textContent = \`Game over! The number was \${targetNumber}.\`;
        resultDiv.className = 'result error';
        guessBtn.disabled = true;
      }
    }

    guessBtn.addEventListener('click', () => {
      if (gameOver) return;
      
      const guess = parseInt(guessInput.value);
      
      if (isNaN(guess) || guess < 1 || guess > 17) {
        resultDiv.textContent = 'Please enter a valid number between 1 and 17';
        resultDiv.className = 'result error';
        return;
      }
      
      attempts++;
      updateGame();
      
      if (guess === targetNumber) {
        resultDiv.textContent = \`🎉 Correct! The number was \${targetNumber}. You won in \${attempts} attempts!\`;
        resultDiv.className = 'result success';
        gameOver = true;
        guessBtn.disabled = true;
        return;
      }
      
      const hint = guess > targetNumber ? "lower" : "higher";
      resultDiv.textContent = \`Try again! Go \${hint}. \${maxAttempts - attempts} attempts left.\`;
      resultDiv.className = 'result info';
      guessInput.value = '';
      guessInput.focus();
    });
    
    resetBtn.addEventListener('click', () => {
      targetNumber = Math.floor(Math.random() * 17) + 1;
      attempts = 0;
      gameOver = false;
      guessBtn.disabled = false;
      resultDiv.textContent = '';
      resultDiv.className = 'result';
      guessInput.value = '';
      guessInput.focus();
      updateGame();
    });
    
    guessInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        guessBtn.click();
      }
    });
    
    guessInput.focus();
    updateGame();
  </script>
</body>
</html>`;

// Serve the HTML for all requests
serve(async (request) => {
  return new Response(HTML, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
});
