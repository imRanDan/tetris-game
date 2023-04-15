const theGrid = document.querySelector('.the-grid')
let squares = Array.from(document.querySelectorAll('.the-grid div'))
const scoreDisplay = document.querySelector('#score')
const startBtn = document.querySelector('start')
const width = 10


// The Tetrominoes
const Ltetromino = [
  [1, width+1, width2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2]
]

const Ttetromino = [
  [1, width, width+1, width+2],
  [1, width+1, width+2, width*2+1],
  [width, width+1, width+2, width*2+1],
  [1, width, width+1, width*2+1]
]

const OTetromino = [
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1]
]