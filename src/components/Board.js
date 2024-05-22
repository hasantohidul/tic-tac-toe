import Square from "./Square";
import { calculateWinner } from "../utilities/calculateWinner";

export default function Board({squares, currentMove, onPlay}) {

    const result = calculateWinner(squares);
    const winner = result ? result.winner : null;
    const winningLine = winner ? result.line : [];

    const isDraw = !winner && squares.every(square => square !== null);

    const status = winner ? "Winner: " + winner : isDraw ? "Match is Drawn" : "Next move: " + (currentMove % 2 === 0 ? "X" : "O");
    
     const handleClick = i => {
        if (squares[i] || winner) return null;
        const nextSquares = squares.slice();
        if (currentMove % 2 === 0) nextSquares[i] = "X";
        else nextSquares[i] = "O";
        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;
        onPlay(nextSquares, row, col);
     }




     const renderSquare = i => <Square value={squares[i]}  highlight={winningLine.includes(i)} onSquareClick={() => handleClick(i)} />

     const renderRow = rowIndex => {
        const rowSquares = [];
        for (let i = 0; i < 3; i++) {
            rowSquares.push(renderSquare(rowIndex * 3 + i));
        }

        return <div className="board-row">{rowSquares}</div>
     }

     const rows = [];
     for (let i = 0; i < 3; i++) {
        rows.push(renderRow(i));
     }

     return (
        <div className="game-board">
        <div className="status">{status}</div>
        {rows}
        </div>
     )
}