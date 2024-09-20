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
  const [score, setScore] = useState<number>(0);

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
        case "ArrowUp": {
          const data = moveTiles(newBoard, "up");
          setScore((state) => state + data.score);
          break;
        }
        case "ArrowDown": {
          const data = moveTiles(newBoard, "down");
          setScore((state) => state + data.score);
          break;
        }
        case "ArrowLeft": {
          const data = moveTiles(newBoard, "left");
          setScore((state) => state + data.score);
          break;
        }
        case "ArrowRight": {
          const data = moveTiles(newBoard, "right");
          setScore((state) => state + data.score);
          break;
        }
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

  return { board, setBoard, setGameOver, gameOver, score, setScore };
};
