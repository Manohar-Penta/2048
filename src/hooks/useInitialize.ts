import { useEffect, useState } from "react";
import {
  initializeBoard,
  moveTiles,
  checkgame,
  addRandomTile,
  freeSpace,
} from "../gameLogic";

export const useInitialize = () => {
  const [board, setBoard] = useState<string>(JSON.stringify(initializeBoard()));
  const [gameOver, setGameOver] = useState<boolean>(false);

  const newBoard: Array<Array<number>> = JSON.parse(board);

  useEffect(() => {
    if (!checkgame(JSON.parse(board))) {
      setGameOver(true);
    }
  }, [board]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      event.preventDefault();
      if (gameOver) return;
      switch (event.key) {
        case "ArrowUp":
          moveTiles(newBoard, "up");
          break;
        case "ArrowDown":
          moveTiles(newBoard, "down");
          break;
        case "ArrowLeft":
          moveTiles(newBoard, "left");
          break;
        case "ArrowRight":
          moveTiles(newBoard, "right");
          break;
        default:
          return;
      }

      const b = JSON.stringify(newBoard);

      if (b != board && freeSpace(newBoard)) addRandomTile(newBoard);

      setBoard(JSON.stringify(newBoard));
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board]);

  return { board, setBoard, setGameOver, gameOver };
};
