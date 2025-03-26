import React from 'react'

export const Cell = React.memo(({ value, onClick }) => {
    return (
        <button className="cell" onClick={onClick} disabled={value !== null} data-value={value}></button>
    )
});