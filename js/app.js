const theGrid = document.querySelector('.the-grid')
let squares = Array.from(document.querySelectorAll('.the-grid div'))
const scoreDisplay = document.querySelector('#score')
const startBtn = document.querySelector('start')
const width = 10


// The Tetrominoes
const lTetromino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2]
]

const tTetromino = [
  [1, width, width+1, width+2],
  [1, width+1, width+2, width*2+1],
  [width, width+1, width+2, width*2+1],
  [1, width, width+1, width*2+1]
]

const oTetromino = [
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1]
]

const iTetromino = [
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3]
]

const allTetrominoes = [lTetromino, tTetromino, oTetromino, iTetromino]


let currentPosition = 4
let currentRotation = 0

// randomly select a Tetromino and its first rotation
let random = Math.floor(Math.random()*allTetrominoes.length)
let current = allTetrominoes[random][0]

// draw the first rotation in the first tetromino

function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino')
  })
}

function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino')
  })
}

// moves tetromino down every second
timerId = setInterval(moveDown, 1000)


// Move down
function moveDown() {
  undraw()
  currentPosition += width
  draw()
}

// Freeze
function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    // starts a new tetromino to fall
    random = Math.floor(Math.random() * allTetrominoes.length)
    current = allTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
  }
}