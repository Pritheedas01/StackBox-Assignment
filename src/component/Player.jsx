import React from 'react'

export const Player = ({ setPlayer }) => {
    return (
        <div className="symbol-selection">
            <p>Select your symbol:</p>
            <button onClick={() => setPlayer("X")}>X</button>
            <button onClick={() => setPlayer("O")}>O</button>
      </div>
    )
}
