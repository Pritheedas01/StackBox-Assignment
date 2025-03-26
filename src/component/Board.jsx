import React from 'react';
import { Cell } from "./Cell";

export const Board = ({ board, handleClick }) => {
  return (
    <div className="board">
        {board.map((cell, index) => (
            <Cell key={index} value={cell} onClick={() => handleClick(index)} />
        ))}
  </div>
  )
}