import React from 'react';
import { useState, useEffect, useCallback } from "react";
import { Board } from "./Board";
import { Player } from './Player';

const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];

export const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(null);
    const [winner, setWinner] = useState(null);
    const [isBotTurn, setIsBotTurn] = useState(false);
  

    const checkWinner = (currentBoard) => {
      for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
          setWinner(currentBoard[a]);
          return currentBoard[a];
        }
      }
      if (!currentBoard.includes(null)) {
        console.log("Draw");
        setWinner("Draw");
        return "Draw";
      }
      return null;
    };
  
   
    const handleClick = (index) => {
      if (board[index] || winner || !player || isBotTurn) return;
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setIsBotTurn(true);
    };
  
   
    useEffect(() => {
      if (isBotTurn && !winner) {
        const fetchBotMove = async () => {
          try {
            const response = await fetch("https://hiring-react-assignment.vercel.app/api/bot", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(board),
            });
            const botMove = await response.json();
            if (botMove !== null && board[botMove] === null) {
              setBoard((prevBoard) => {
                const updatedBoard = [...prevBoard];
                updatedBoard[botMove] = player === "X" ? "O" : "X";
                checkWinner(updatedBoard);
                return updatedBoard;
              });
            }
          } catch (error) {
            console.error("Error fetching bot move:", error);
          }
          setIsBotTurn(false);
        };
  
        setTimeout(fetchBotMove, 200);
      }
    }, [isBotTurn, winner, player]);

    useEffect(() => {
        checkWinner(board);
      }, [board, checkWinner]);
  

    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setWinner(null);
      setPlayer(null);
      setIsBotTurn(false);
    };
  
    return (
      <div className="game">
        {!player ? (
          <Player setPlayer={setPlayer} />
        ) : (
          <>
            <Board board={board} handleClick={handleClick} />
            {winner && <p className="winner">{winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}</p>}
            <button onClick={resetGame}>Restart</button>
          </>
        )}
      </div>
    );
  };
