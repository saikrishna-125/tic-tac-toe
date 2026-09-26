const gameBoard = (() => {
  const gameBoard = [];

  for (let i = 0; i <= 2; i++) {
    let row = [];

    for (let j = 0; j <= 2; j++) {
      row.push(null);
    }

    gameBoard.push(row);
  }

  const getGameBoard = function () {
    return gameBoard;
  };

  const playTurn = function (x, y, char) {
    gameBoard[x][y] = char;
  };

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

  return { getGameBoard, playTurn, checkWin };
})();

const createPlayer = function (name, token) {
  const getPlayerName = function () {
    return name;
  };

  const getPlayerToken = function () {
    return token;
  };

  return { getPlayerName, getPlayerToken };
};

const gameUI = (function () {
  const gameCells = document.querySelectorAll(".game-cell");

  const displayBoard = function () {
    for (const gameCell of gameCells) {
      let [x, y] = gameCell.id.split("_").slice(1);
      gameCell.textContent = gameBoard.getGameBoard()[x][y];
    }
  };

  for (const gameCell of gameCells) {
    gameCell.addEventListener("click", () => {
      if (!gameCell.textContent && !ticTacToe.getGameOver()) {
        let [x, y] = gameCell.id.split("_").slice(1);
        gameBoard.playTurn(x, y, ticTacToe.getCurrentPlayer().getPlayerToken());
        ticTacToe.completeTurn();
        displayBoard();
      }
    });
  }

  return { displayBoard };
})();

const playerX = createPlayer("John", "X");
const playerO = createPlayer("Jack", "O");

const ticTacToe = (function () {
  let remainingTurns = 9;

  const players = [playerX, playerO];

  let currentPlayer = playerX;

  let gameOver = false;

  const completeTurn = function () {
    if (gameBoard.checkWin()) {
      console.log(`${currentPlayer.getPlayerName()} has won the game`);
      gameOver = true;
      return;
    }

    remainingTurns -= 1;
    currentPlayer = players[1 - (remainingTurns % 2)];

    if (remainingTurns === 0) {
      console.log("Game over! It is a draw!");
      gameOver = true;
    }
  };

  const getCurrentPlayer = function () {
    return currentPlayer;
  };

  const getGameOver = function () {
    return gameOver;
  };

  return { completeTurn, getCurrentPlayer, getGameOver };
})();

gameUI.displayBoard();
