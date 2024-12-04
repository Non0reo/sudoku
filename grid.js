const cellFormat = 'cell-';

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
      gridCell.appendChild(cell);
    }
  }
}

function setNumberInCell(cell, number) {
  const cellElement = document.getElementById(cell);
  //create a span element to hold the number only if it doesn't exist
  if (!cellElement.querySelector('span')) {
      const span = document.createElement('span');
      span.textContent = number;
      cellElement.appendChild(span);
  } else {
      cellElement.querySelector('span').textContent = number;
  }
}

createGridElement();