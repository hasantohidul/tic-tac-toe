import { useState } from "react";
import Board from "./components/Board";

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);
  const currentSquares = history[currentMove].squares;

  const handlePlay = (latestSquares, row, col) => {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: latestSquares, location: { row, col } },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((step, move, history) => {

    const firstButton = "Go, start the game";
    if (move > 0 && move === history.length - 1)
      return (
        <li key={move}>
          You are currently at move #{move}, row number {step.location.row} and column number{" "}
          {step.location.col}
        </li>
      );
    else
      return (
        <li key={move} className="mb-2 mt-3 pl-0">
          <button className="btn btn-primary w-100 p-1 fs-6" onClick={() => jumpTo(move)}>
            {move === 0
              ? firstButton
              : `Go to move #${move} row number ${step.location.row} column number ${step.location.col}`}
          </button>
        </li>
      );
  });

  const sortedMoves = !ascending ? moves.slice().reverse() : moves;


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
        <div className="game">
      <div className="row">
      <Board
        squares={currentSquares}
        onPlay={handlePlay}
        currentMove={currentMove}
      />
      <div>
        <br/>
        <button className="btn btn-secondary mt-3" onClick={() => ascending ? setAscending(false) : setAscending(true)}>
          {ascending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <ol className="move-list">{
        sortedMoves}</ol>
      </div>
    </div>
      </div>
        </div>
      </div>
    </div>
    
      
  );
}
