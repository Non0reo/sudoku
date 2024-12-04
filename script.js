let sudoku;

function createSudokuGrid() {
    let sudoku = new Array(9);
    for (let i = 0; i < 9; i++) {
        sudoku[i] = new Array(9);
    }
    return sudoku;
}

function getRow(row) {
    let rowList = [];
    const cellRow = Math.floor(row / 3) * 3;
    for (let i = cellRow; i < cellRow + 3; i++) {
        const innerCellRow = 3 * (row % 3);
        
        for (let j = innerCellRow; j < innerCellRow + 3; j++) {
            rowList.push(sudoku[i][j])
        }
    }
    return rowList;
}

function getColumn(column) {
    let columnList = [];
    const cellColumn = Math.floor(column / 3);
    for (let i = cellColumn; i <= cellColumn + 6; i += 3) {
        const innerCellColumn = column % 3;
        
        for (let j = innerCellColumn; j <= innerCellColumn + 6; j += 3) {
            columnList.push(sudoku[i][j])
        }
    }
    return columnList;
}

function getCell(cell) {
    let cellList = [];
    for (const innerCell of sudoku[cell]) {
        cellList.push(innerCell);   
    }
    return cellList;
}


sudoku = createSudokuGrid();


function makeGrid() {
    let digitDoneCount = 0;
    for (let i = 0; i < sudoku.length; i++) {
        const cell = sudoku[i];

        let availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let testedNumbers;
        console.log('--- NEW CELL ---')
        for (let j = 0; j < cell.length; j++) {
            const number = cell[j];
            
            let hasConflict = true;
            let countERRORS = 0;

            
            testedNumbers = availableNumbers;
            while(hasConflict) {
                if(countERRORS > 300) throw new Error('INFINITE LOOP !!!');

                //const randomNumber = Math.floor(Math.random() * 9) + 1;
                const randomNumber = testedNumbers[Math.floor(Math.random() * testedNumbers.length)];
                const gridPos = cellPosToGridPos(i, j);

                countERRORS++;



                // if(getCell(i).includes(randomNumber)) continue;
                // if(getRow(gridPos[0]).includes(randomNumber)) continue;
                // if(getColumn(gridPos[1]).includes(randomNumber)) continue;

                if(!getCell(i).includes(randomNumber) &&
                !getRow(gridPos[0]).includes(randomNumber) &&
                !getColumn(gridPos[1]).includes(randomNumber)) {

                    sudoku[i][j] = randomNumber;
                    setNumberInCell(`${cellFormat}${i}-${j}`, randomNumber);

                    hasConflict = false;
                    availableNumbers = availableNumbers.filter(number => number !== randomNumber);
                } else {
                    testedNumbers = testedNumbers.filter(number => number !== randomNumber);
                }

                console.log(`
cell: ${getCell(i)}
row: ${getRow(gridPos[0])}
column: ${getColumn(gridPos[1])}

availableNumbers: ${availableNumbers}, testedNumbers: ${testedNumbers}
                    `)
            }
            digitDoneCount++;
        }
        
    }
}


function cellPosToGridPos(cell, innerCell) {
    return [
        Math.floor(cell / 3) * 3 + Math.floor(innerCell / 3),
        (cell % 3) * 3 + (innerCell % 3)
    ]
}