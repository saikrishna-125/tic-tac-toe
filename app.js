const gameBoard = (() => {
  const gameBoard = [];

  for (let i = 0; i <= 2; i++) {
    let row = [];

    for (let j = 0; j <= 2; j++) {
      row.push(null);
    }

    gameBoard.push(row);
  }

  const displayBoard = function () {
    for (let i = 0; i <= 2; i++) {
      console.log(gameBoard[i]);
    }
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
      gameBoard[0][0] &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
    ) {
      return gameBoard[0][0];
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

  return { displayBoard, playTurn, checkWin };
})();

const createPlayer = function (name, char) {
  const getPlayerName = function () {
    return name;
  };
};

gameBoard.displayBoard();

gameBoard.playTurn(1, 1, "X");
console.log(gameBoard.checkWin());

gameBoard.playTurn(0, 0, "X");
console.log(gameBoard.checkWin());

gameBoard.playTurn(2, 2, "X");
console.log(gameBoard.checkWin());

gameBoard.displayBoard();
