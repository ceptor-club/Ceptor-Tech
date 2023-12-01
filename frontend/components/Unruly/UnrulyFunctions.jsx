const threeInRow = ' border-red-500'
const moreThanHalf = ' text-center p-2'

export function threeInRowCheck(board, rowIndex, colIndex) {
    const value = board[rowIndex][colIndex];

    const isMatchingHorizontal = () => {
        let count = 1;
        let i = colIndex - 1;
        while (i >= 0 && board[rowIndex][i].value === value.value) {
            count++;
            i--;
        }

        i = colIndex + 1;
        while (i < board[rowIndex].length && board[rowIndex][i].value === value.value) {
            count++;
            i++;
        }

        return count >= 3;
    };

    const isMatchingVertical = () => {
        let count = 1;
        let i = rowIndex - 1;
        while (i >= 0 && board[i][colIndex].value === value.value) {
            count++;
            i--;
        }

        i = rowIndex + 1;
        while (i < board.length && board[i][colIndex].value === value.value) {
            count++;
            i++;
        }

        return count >= 3;
    };

    return {
        isMatchingHorizontal,
        isMatchingVertical,
    };
}

export function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}



function getColumn(array, colIndex) {
    return array.map((row) => row[colIndex]);
}


export function getCellClasses(value, rowIndex, colIndex, currentBoardArray) {
    // Add the necessary logic to determine the classes for each cell based on the conditions
    let classes = "";

    switch (value.value) {
        case 0:
            classes = "bg-transparent text-transparent border-black";
            break;
        case 1:
            classes = "bg-black text-black border-black";
            break;
        case 2:
            classes = "bg-white text-white border-black";
            break;
        default:
            break;
    }

    if (!value.clickable) {
        classes += " cursor-not-allowed"; // Apply a 'not-allowed' cursor style
    }

    const boardLength = currentBoardArray[0].length;

    const rowCounts = countColors(currentBoardArray[rowIndex]);
    let rowDominantColor = -1;
    let rowDominantCount = -1;
    for (const color in rowCounts) {
        if (rowCounts[color] > rowDominantCount) {
            rowDominantColor = parseInt(color);
            rowDominantCount = rowCounts[color];
        }
    }
    
    if (value.value === rowDominantColor && rowDominantCount > boardLength / 2) {
        classes += moreThanHalf;
        if (value.value === 1) classes = classes.replace('text-black', 'text-red-500');
        if (value.value === 2) classes = classes.replace('text-white', 'text-red-500');
    }

    const columnCounts = countColors(getColumn(currentBoardArray, colIndex));
    let columnDominantColor = -1;
    let columnDominantCount = -1;
    for (const color in columnCounts) {
        if (columnCounts[color] > columnDominantCount) {
            columnDominantColor = parseInt(color);
            columnDominantCount = columnCounts[color];
        }
    }
    if (value.value === columnDominantColor && columnDominantCount > boardLength / 2) {
        classes += moreThanHalf;
        if (value.value === 1) classes = classes.replace('text-black', 'text-red-500');
        if (value.value === 2) classes = classes.replace('text-white', 'text-red-500');
    }

    const { isMatchingHorizontal, isMatchingVertical } = threeInRowCheck(
        currentBoardArray,
        rowIndex,
        colIndex
    );

    if (value.value !== 0 && (isMatchingHorizontal() || isMatchingVertical())) {
        classes += threeInRow;
    }
    
    return `w-12 h-12 border-4 m-2 ${classes}`;
}

const countColors = (row) => {
    const rowCounts = { 0: 0, 1: 0, 2: 0 };
    row.forEach((cell) => {
        rowCounts[cell.value]++;
    });
    return rowCounts;
};

