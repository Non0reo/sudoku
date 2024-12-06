function createSudokuGrid() {
    const size = 9; // Grid size (9x9)
    const grid = Array.from({ length: size }, () => Array(size).fill(0)); // Initialize a 9x9 grid with zeros

    // Helper function to check if a number can be placed in a cell
    function isValidPlacement(grid, row, col, num) {
        for (let i = 0; i < size; i++) {
            // Check row, column, and 3x3 sub-grid
            if (
                grid[row][i] === num || // Check the row
                grid[i][col] === num || // Check the column
                grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][
                    3 * Math.floor(col / 3) + (i % 3)
                ] === num // Check the 3x3 sub-grid
            ) {
                return false;
            }
        }
        return true;
    }

    // Recursive function to fill the grid
    function fillGrid(grid) {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (grid[row][col] === 0) {
                    // Try numbers 1 through 9 in random order
                    const numbers = shuffle([...Array(size).keys()].map((x) => x + 1));
                    for (const num of numbers) {
                        if (isValidPlacement(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (fillGrid(grid)) {
                                return true;
                            }
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // No valid placement found, backtrack
                }
            }
        }
        return true; // Grid completely filled
    }

    // Shuffle array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Fill the grid and return it
    fillGrid(grid);
    return grid;
}



function removeNumbers(grid, count) {
    let copyGrid = [...grid];
    for (let i = 0; i < count; i++) {
        const ligne = Math.floor(Math.random() * 9);
        const colonne = Math.floor(Math.random() * 9);
        copyGrid[ligne][colonne] = '';
    }
    return copyGrid;
}


function displayGrid(grid) {
    grid.forEach(row => console.log(row.join(" ")));
}


function convertToCell(flatArray) {
    let cellArray = new Array(9);
    for (let i = 0; i < 9; i++) {
        cellArray[i] = new Array(9);
    }

    for (let i = 0; i < flatArray.length; i++) {

        for (let j = 0; j < flatArray[i].length; j++) {
            
            const x = (i % 3) * 3 + j % 3;
            const y = Math.floor(i / 3) * 3 + Math.floor(j / 3);

            cellArray[i][j] = flatArray[y][x];
            
        }
    }
    console.log(cellArray);
    return cellArray;
}



let sudokuGrid = convertToCell(createSudokuGrid());
let displayedSudokuGrid = JSON.parse(JSON.stringify(sudokuGrid));

removeNumbers(displayedSudokuGrid, 45);
putSudokuInGrid(displayedSudokuGrid);


function verifySudoku(grid1, grid2) {
    let errorCells = [];

    for (let i = 0; i < grid1.length; i++) {
        for (let j = 0; j < grid1[i].length; j++) {
            if (grid1[i][j] !== grid2[i][j] && grid1[i][j] !== '') {
                errorCells.push([i, j]);
            }
        }
    }

    //highlight error cells
    const grid = document.getElementById('grid');
    const cells = grid.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.classList.remove('error');
    });

    errorCells.forEach(cell => {
        const cellID = `${cellFormat}${cell[0]}-${cell[1]}`;
        const cellDOM = document.getElementById(cellID);
        cellDOM.classList.add('error');
    });

    setTimeout(() => {
        errorCells.forEach(cell => {
            const cellID = `${cellFormat}${cell[0]}-${cell[1]}`;
            const cellDOM = document.getElementById(cellID);
            cellDOM.classList.remove('error');
        });
    }, 1000);
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].length !== arr2[i].length) return false;
        for (let j = 0; j < arr1[i].length; j++) {
            if (arr1[i][j] !== arr2[i][j]) return false;
        }
    }
    return true;
}
