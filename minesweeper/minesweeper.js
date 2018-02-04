document.addEventListener('DOMContentLoaded', startGame)
// Variables for size and difficulty of board.
var board = {'cells':[]};
var size = 6;
var maxbomb = 4;

function makeBoard (size, maxbomb) {
//create cell objects with values and add to cells array. 
  for (i = 0; i < size; i++)
    for (j = 0; j < size; j++)//This means within each i, you'll iterate through a bunch of j's.
      board.cells.push ({
        row: i,
	col: j,
	isMine: false,
	isMarked: false,
	hidden: true 
      })
    makeBombs(maxbomb) 
}

function makeBombs (maxBomb) {
//Turn a certain number of cells into 'isMine:true'.  Number based on maxbomb
  var numBombs = 0;
  while (numBombs < maxBomb) {
    var cell = board.cells[randomize()];
     
    if (cell.isMine)
      continue;

    cell.isMine = true;
    numBombs += 1;
  }   
}

function randomize () {
//Find a random whole number that's within the range of cells on the board (size squared)
  var max = size * size;
  return Math.floor(Math.random() * max)
}

function startGame () {
//Start up the game by making up the board and initializing thangs.
  makeBoard(size, maxbomb)
  for (var i = 0; i < board.cells.length; i++)
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  lib.initBoard()
  document.addEventListener('click',checkForWin)
  document.addEventListener('contextmenu', checkForWin) 
}

function checkForWin () {
// Look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
  for (var i = 0; i < board.cells.length; i++){
    if (board.cells[i].isMine && board.cells[i].isMarked == false)
      return;
    else if (board.cells[i].isMine == false  && board.cells[i].hidden)
      return; 
  }
  lib.displayMessage('You win!'); 
  var song = document.getElementById('winning-song')
  song.play()
}

function countSurroundingMines (cell) {
//For each cell, count the number of mines surrounding that cell.
  var count = 0;
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  for (i = 0; i < surroundingCells.length; i++){
    if (surroundingCells[i].isMine == true)
      count++;
  }
  return count;
}

