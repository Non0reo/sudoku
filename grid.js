const cellFormat = '';

function createGridElement() {
  const grid = document.getElementById('grid');
  
  for (let i = 0; i < 9; i++) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('gridCell');
    grid.appendChild(gridCell);

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.type = 'text';
      cell.maxLength = 1;
      cell.id = `${cellFormat}${i}-${j}`;

      cell.addEventListener('click', function() {
        const selectedCell = document.querySelector('.selected');
        if (selectedCell) selectedCell.classList.remove('selected');

        this.classList.add('selected');

        //if(this.classList.contains('given')) {
          higlightSimilarNumbers(`${cellFormat}${i}-${j}`);
        //}
      });

      gridCell.appendChild(cell);
    }
  }
}

function setNumberInCell(cell, number, isGiven = false) {
  const cellElement = document.getElementById(cell);
  //create a span element to hold the number only if it doesn't exist
  
  if (!cellElement.querySelector('span')) {
      if (parseInt(number) != 0) {
        const span = document.createElement('span');
        span.textContent = number;
        cellElement.appendChild(span);
      }
  } else {
      if (parseInt(number) != 0) {
        cellElement.querySelector('span').textContent = number;
      } else {  
        cellElement.querySelector('span').remove();
      }
  }
  
  if (isGiven) {
    cellElement.classList.add('given');
  } else {
    if (parseInt(number) == 0) number = '';
    displayedSudokuGrid[parseInt(cell[0])][parseInt(cell[2])] = number;
  }
}

function putSudokuInGrid(sudoku) {
  for (let i = 0; i < sudoku.length; i++) {
    for (let j = 0; j < sudoku[i].length; j++) {
      if(sudoku[i][j] === '') continue;
      setNumberInCell(`${cellFormat}${i}-${j}`, sudoku[i][j], true);
    }
  }
}

function higlightSimilarNumbers(cellID) {
  const cell = document.getElementById(cellID);
  if(!cell.querySelector('span')) return;
  const number = cell.querySelector('span').textContent;
  const grid = document.getElementById('grid');
  const cells = grid.querySelectorAll('.cell');

  cells.forEach(cell => {
    cell.classList.remove('highlight');
    if (cell.querySelector('span') && cell.querySelector('span').textContent === number) {
      cell.classList.add('highlight');
    }
  });
}


createGridElement();

//detect if the user is typing a number
document.addEventListener('keydown', function(e) {
  const selectedCell = document.querySelector('.selected');

  if (selectedCell && !selectedCell.classList.contains('given')) {
    const selCellId = selectedCell.id;
    //use e.code
    if (e.code.startsWith('Digit')) {
      setNumberInCell(selCellId, e.code.split('Digit')[1]);
      higlightSimilarNumbers(selCellId);
    } else if (e.code === 'Backspace') {
      setNumberInCell(selCellId, 0);
      higlightSimilarNumbers(selCellId);
    } else if (e.key >= 0 && e.key <= 9) { 
      setNumberInCell(selCellId, e.key);
      higlightSimilarNumbers(selCellId);
    }
    

    if(arraysEqual(displayedSudokuGrid, sudokuGrid)) {
      alert('Congratulations! You have solved the puzzle!');
    }
  }
});

//if click outside the grid, remove the selected class and the highlight class
document.addEventListener('click', function(e) {
  const grid = document.getElementById('grid');
  const selectedCell = document.querySelector('.selected');
  if (selectedCell && !grid.contains(e.target)) {
    selectedCell.classList.remove('selected');
    const cells = grid.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.classList.remove('highlight');
    });
  }
});




document.getElementById('verify').onclick = function() {
  verifySudoku(displayedSudokuGrid, sudokuGrid);
}