// IIFE to setup gameBoard object
const gameBoard = (() => {
  let gameBoard;

  // set gameBoard initial cells to null

  const newBoard = function newBoard() {
    gameBoard = [];
    for (let i = 0; i <= 2; i++) {
      let row = [];

      for (let j = 0; j <= 2; j++) {
        row.push(null);
      }

      gameBoard.push(row);
    }
  };

  newBoard();

  // gameBoard getter
  const getGameBoard = function () {
    return gameBoard;
  };

  // sets character token in specified cell
  const playTurn = function (x, y, char) {
    gameBoard[x][y] = char;
  };

  // checks all 8 lines in the grid for a winning combination
  const checkWin = function () {
    for (let i = 0; i <= 2; i++) {
      if (
        gameBoard[i][0] &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2]
      ) {
        return gameBoard[i][0];
      }

      if (
        gameBoard[0][i] &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
      ) {
        return gameBoard[0][i];
      }
    }

    if (
      (gameBoard[1][1] &&
        gameBoard[0][0] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][2]) ||
      (gameBoard[2][0] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[0][2])
    ) {
      return gameBoard[1][1];
    }

    return null;
  };

  return { getGameBoard, playTurn, checkWin, newBoard };
})();

// Factory function to create player
const createPlayer = function (name, token) {
  let score = 0;

  const getPlayerName = function () {
    return name;
  };

  const getPlayerToken = function () {
    return token;
  };

  const increaseScore = function () {
    score++;
  };

  const getScore = function () {
    return score;
  };

  return { getPlayerName, getPlayerToken, increaseScore, getScore };
};

// IIFE to setup game UI
const gameUI = (function () {
  const gameCells = document.querySelectorAll(".game-cell");
  const gameContainer = document.querySelector(".game-container");
  const gameResult = document.querySelector(".result");

  const playerXScore = document.querySelector("#player-x-score");
  const playerOScore = document.querySelector("#player-o-score");

  const playerFormContainer = document.querySelector(".player-form-container");
  const gameOverButtons = document.querySelector(".game-over-buttons");

  // Function that dispalays the gameBoard array on the UI
  const displayBoard = function () {
    for (const gameCell of gameCells) {
      let [x, y] = gameCell.id.split("_").slice(1);
      gameCell.textContent = gameBoard.getGameBoard()[x][y];
    }
  };

  for (const gameCell of gameCells) {
    gameCell.addEventListener("click", () => {
      // condition blocks selecting already filled cell and
      // prevents users to play after game is completed

      if (!gameCell.textContent && !ticTacToe.getGameOver()) {
        let [x, y] = gameCell.id.split("_").slice(1);
        gameBoard.playTurn(x, y, ticTacToe.getCurrentPlayer().getPlayerToken());
        ticTacToe.completeTurn();
        displayBoard();
      }
    });
  }

  // Helper function to set result text on the UI
  const displayResult = function (resultText) {
    gameResult.textContent = resultText;
  };

  // Player input form
  const playerXInput = document.querySelector("#player-x-name");
  const playerOInput = document.querySelector("#player-o-name");
  const playerForm = document.querySelector(".player-form");

  playerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    playerXName = playerXInput.value;
    playerOName = playerOInput.value;

    ticTacToe.addPlayers(playerXName, playerOName);

    gameContainer.classList.remove("no-show");
    playerFormContainer.classList.add("no-show");
    displayBoard();

    playerForm.reset();
  });

  const setScoreBoard = function (xName, oName, xScore, oScore) {
    playerXScore.textContent = `${xName}: ${xScore}`;
    playerOScore.textContent = `${oName}: ${oScore}`;
  };

  const addGameOverUI = function () {
    const newRoundButton = document.createElement("button");
    const newGameButton = document.createElement("button");

    newRoundButton.textContent = "New Round";
    newGameButton.textContent = "New Game";

    newRoundButton.addEventListener("click", () => {
      ticTacToe.resetGame();
      newRoundButton.remove();
      newGameButton.remove();
      gameBoard.newBoard();
      displayResult("");
      displayBoard();
    });

    newGameButton.addEventListener("click", () => {
      gameContainer.classList.add("no-show");
      playerFormContainer.classList.remove("no-show");
      ticTacToe.restartGame();
      newRoundButton.remove();
      newGameButton.remove();
      gameBoard.newBoard();
      displayResult("");
      displayBoard();

      playerXScore.textContent = "";
      playerOScore.textContent = "";
    });

    gameOverButtons.appendChild(newRoundButton);
    gameOverButtons.appendChild(newGameButton);
  };

  return { displayBoard, displayResult, addGameOverUI, setScoreBoard };
})();

// TicTacToe game
const ticTacToe = (function () {
  let remainingTurns = 9;
  let players = [];
  let currentPlayer;

  const addPlayers = function (playerXName, playerOName) {
    players.push(createPlayer(playerXName, "X"));
    players.push(createPlayer(playerOName, "O"));

    currentPlayer = players[0];
  };

  let gameOver = false;

  // check win condition or end of all turns to decide winner or draw match,
  // else decrement turns and switch player

  const completeTurn = function () {
    remainingTurns -= 1;

    if (gameBoard.checkWin()) {
      gameUI.displayResult(`${currentPlayer.getPlayerName()} has won the game`);
      currentPlayer.increaseScore();
      gameOver = true;
    }

    if (remainingTurns === 0) {
      gameUI.displayResult("Game over! It is a draw!");
      gameOver = true;
    }

    if (gameOver) {
      gameUI.setScoreBoard(
        players[0].getPlayerName(),
        players[1].getPlayerName(),
        players[0].getScore(),
        players[1].getScore(),
      );
      gameUI.addGameOverUI();
      return;
    }

    currentPlayer = players[1 - (remainingTurns % 2)];
  };

  const getCurrentPlayer = function () {
    return currentPlayer;
  };

  const getGameOver = function () {
    return gameOver;
  };

  const resetGame = function () {
    remainingTurns = 9;
    currentPlayer = players[0];
    gameOver = false;
  };

  const restartGame = function () {
    players = [];
    remainingTurns = 9;
    gameOver = false;
  };

  return {
    completeTurn,
    getCurrentPlayer,
    getGameOver,
    addPlayers,
    resetGame,
    restartGame,
  };
})();
