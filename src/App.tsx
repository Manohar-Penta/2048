// src/App.js
import "./App.css";
import { motion } from "framer-motion";
import { useInitialize } from "./hooks/useInitialize";
import { initializeBoard } from "./gameLogic";

const App = () => {
  const { board, setBoard, gameOver, setGameOver } = useInitialize();

  return (
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
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
