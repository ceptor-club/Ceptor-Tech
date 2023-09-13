import React from "react";
import { useState } from "react";
import { getCellClasses } from './UnrulyFunctions'
import { eight, generateBoard } from './UnrulyBoards'

export default function Unruly() {
    // eslint-disable-next-line no-unused-vars
    const [selectedBoardSize, setSelectedBoardSize] = useState(eight)
    const [currentBoardArray, setCurrentBoardArray] = useState(() => {
        return generateBoard(selectedBoardSize)
    });

    function handleColorChange(rowIndex, colIndex) {
        const cell = currentBoardArray[rowIndex][colIndex];
        if (cell.clickable) {
            const newColors = [...currentBoardArray];
            const currentValue = newColors[rowIndex][colIndex].value;
            switch (currentValue) {
                case 1:
                    newColors[rowIndex][colIndex].value = 2;
                    break;
                case 2:
                    newColors[rowIndex][colIndex].value = 0;
                    break;
                default:
                    newColors[rowIndex][colIndex].value = 1;
            }
            setCurrentBoardArray(newColors);
        }
        checkWin(rowIndex, colIndex)
    }

    // function handleBoardSizeChange(event) {
    //     const newBoardSize = parseInt(event.target.value, 10);
    //     setSelectedBoardSize(newBoardSize)
    // }

    function checkWin(rowIndex, colIndex) {
        const currentBoardArrayValue = currentBoardArray.flat().reduce((a,b) => a + b.value, 0)
        const expectedValue = Math.pow((currentBoardArray.length / 2),2) * 6
        const hasRedText = currentBoardArray.flat().some(cell => {
            const classes = getCellClasses(cell, rowIndex, colIndex, currentBoardArray);
            return classes.includes('text-red-500');
        });
    
        const hasRedBorder = currentBoardArray.flat().some(cell => {
            const classes = getCellClasses(cell, rowIndex, colIndex, currentBoardArray);
            return classes.includes('border-red-500');
        });
    
        if(currentBoardArrayValue === expectedValue && !hasRedBorder && !hasRedText) {
            setTimeout(() => {
                alert("Congratulations! You've solved the puzzle!");
            }, 100);
        }
    }

    function newGame() {
        const newBoard = generateBoard(selectedBoardSize)
        setCurrentBoardArray(newBoard);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500 text-black">
            <div className="absolute top-4 left-4">
                <button onClick={() => window.history.back()} className="border-black border-2 p-1 rounded-md bg-white">
                    Back
                </button>
            </div>
            <h1 className="text-center text-6xl mb-8">Unruly</h1>
            <div>
                <div className="p-2">
                    {currentBoardArray.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((value, colIndex) => (
                                <div
                                    key={colIndex}
                                    onClick={() => handleColorChange(rowIndex, colIndex)} // Changed the function name
                                    className={`w-12 h-12 ${getCellClasses(
                                        value,
                                        rowIndex,
                                        colIndex,
                                        currentBoardArray
                                    )} border-4 m-2`}
                                >
                                    !
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button onClick={newGame} className="mt-4 border-black border-4 p-2 rounded-md bg-white">New Game?</button>
                </div>
                <p className="text-center pt-4">There should be an equal number of black and white squares</p>
                <p className="text-center">No more than 2 consecutive squares should be the same color</p>
                <div className="text-center">
                    <a href="https://www.chiark.greenend.org.uk/~sgtatham/puzzles/doc/unruly.html#unruly" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-cyan-300 underline decoration-1">
                        Full Instructions
                    </a>
                </div>
                {/* <label>Board Size:</label>
            <select
                id="boardSize"
                value={selectedBoardSize}
                onChange={handleBoardSizeChange}
            >
                <option value="8">8x8</option>
                <option value="10">10x10</option>
                <option value="12">12x12</option>
                <option value="14">14x14</option>
            </select> */}
            </div>
        </div>
    );

}