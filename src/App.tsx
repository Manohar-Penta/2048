// src/App.js
import "./App.css";
import { motion } from "framer-motion";
import { useInitialize } from "./hooks/useInitialize";
import { initializeBoard } from "./gameLogic";
import { useState } from "react";

const App = () => {
  const { board, setBoard, gameOver, setGameOver, score, setScore } =
    useInitialize();
  const [highScore, setHighscore] = useState<number>(0);

  return (
    <>
      <div className="scores">
        <h1>2048</h1>
        <div>
          <h2>Score</h2>
          <p>{score}</p>
        </div>
        <div>
          <h2>Best</h2>
          <p>{highScore}</p>
        </div>
      </div>
      <div className="game-container">
        {JSON.parse(board).map((row: Array<number>, rowIndex: number) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <motion.div
                key={cellIndex}
                className={`tile tile-${cell}`}
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                {cell > 0 && cell}
              </motion.div>
            ))}
          </div>
        ))}
        {gameOver && (
          <div className="game-over">
            <h1>Game Over</h1>
            <button
              onClick={() => {
                setBoard(JSON.stringify(initializeBoard()));
                setGameOver(false);
                setScore(0);
                setHighscore(Math.max(score, highScore));
              }}
              className="game-over-button"
            >
              Restart
            </button>
          </div>
        )}
      </div>
      <div className="scores">
        <h1>HighScore : {highScore}</h1>
        <button
          onClick={() => {
            setBoard(JSON.stringify(initializeBoard()));
            setGameOver(false);
            setScore(0);
            setHighscore(Math.max(score, highScore));
          }}
          className="game-over-button"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default App;
