// src/gameLogic.js
export const initializeBoard = () => {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

export const freeSpace = function (board: Array<Array<number>>) {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] == 0) return true;
    }
  }
  return false;
};

export const addRandomTile = (board: Array<Array<number>>) => {
  let added = false;
  while (!added) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    if (board[row][col] === 0) {
      board[row][col] = Math.random() < 0.9 ? 2 : 4;
      added = true;
    }
  }
};

export const checkgame = (board: Array<Array<number>>): boolean => {
  // Check rows
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        return true;
      }
      if (col < 3 && board[row][col] === board[row][col + 1]) {
        return true;
      }
      if (row < 3 && board[row][col] === board[row + 1][col]) {
        return true;
      }
    }
  }
  return false;
};

export const moveTiles = (
  board: Array<Array<number>>,
  direction: string
): { board: Array<Array<number>>; score: number } => {
  switch (direction) {
    case "up":
      return moveTilesUp(board);
    case "down":
      return moveTilesDown(board);
    case "left":
      return moveTilesLeft(board);
    case "right":
      return moveTilesRight(board);
    default:
      return { board, score: 0 };
  }
};

const moveTilesUp = (board: Array<Array<number>>) => {
  let score: number = 0;
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      if (board[row][col] === 0) {
        let nrow = row + 1;
        while (nrow < 4 && board[nrow][col] === 0) nrow++;
        if (nrow < 4) {
          board[row][col] = board[nrow][col];
          board[nrow][col] = 0;
        }
      }
      if (board[row][col] !== 0) {
        let nrow = row + 1;
        while (nrow < 4 && board[nrow][col] === 0) nrow++;
        if (nrow < 4) {
          if (board[nrow][col] === board[row][col]) {
            score += 2 * board[row][col];
            board[row][col] = board[row][col] * 2;
            board[nrow][col] = 0;
          }
        }
      }
    }
  }
  return { board, score };
};

const moveTilesDown = (board: Array<Array<number>>) => {
  let score: number = 0;
  for (let col = 0; col < 4; col++) {
    for (let row = 3; row >= 0; row--) {
      if (board[row][col] === 0) {
        let nrow = row - 1;
        while (nrow >= 0 && board[nrow][col] === 0) nrow--;
        if (nrow >= 0) {
          board[row][col] = board[nrow][col];
          board[nrow][col] = 0;
        }
      }
      if (board[row][col] !== 0) {
        let nrow = row - 1;
        while (nrow >= 0 && board[nrow][col] === 0) nrow--;
        if (nrow >= 0) {
          if (board[nrow][col] === board[row][col]) {
            score += 2 * board[row][col];
            board[row][col] = board[row][col] * 2;
            board[nrow][col] = 0;
          }
        }
      }
    }
  }
  return { board, score };
};

const moveTilesLeft = (board: Array<Array<number>>) => {
  let score: number = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        let ncol = col + 1;
        while (ncol < 4 && board[row][ncol] === 0) ncol++;
        if (ncol < 4) {
          board[row][col] = board[row][ncol];
          board[row][ncol] = 0;
        }
      }
      if (board[row][col] !== 0) {
        let ncol = col + 1;
        while (ncol < 4 && board[row][ncol] === 0) ncol++;
        if (ncol < 4) {
          if (board[row][ncol] === board[row][col]) {
            score += 2 * board[row][col];
            board[row][col] = board[row][col] * 2;
            board[row][ncol] = 0;
          }
        }
      }
    }
  }
  // return board;
  return { board, score };
};

const moveTilesRight = (board: Array<Array<number>>) => {
  let score: number = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 3; col >= 0; col--) {
      if (board[row][col] === 0) {
        let ncol = col - 1;
        while (ncol >= 0 && board[row][ncol] === 0) ncol--;
        if (ncol >= 0) {
          board[row][col] = board[row][ncol];
          board[row][ncol] = 0;
        }
      }
      if (board[row][col] !== 0) {
        let ncol = col - 1;
        while (ncol >= 0 && board[row][ncol] === 0) ncol--;
        if (ncol >= 0) {
          if (board[row][ncol] === board[row][col]) {
            score += 2 * board[row][col];
            board[row][col] = board[row][col] * 2;
            board[row][ncol] = 0;
          }
        }
      }
    }
  }
  return { board, score };
};
