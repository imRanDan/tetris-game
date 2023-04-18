const theGrid = document.querySelector('.the-grid')
let squares = Array.from(document.querySelectorAll('.the-grid div'))
const scoreDisplay = document.querySelector('#score')
const startBtn = document.querySelector('#start')
const width = 10
let nextRandom = 0
let timerId
let score = 0

const colours = [
  'orange',
  'red',
  'purple',
  'green',
  'blue'
]

// function tetrisBorder() {
//   document.querySelectorAll("tetromino").style.borderStyle = "solid"
// }

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');

openModal.addEventListener('click', () => {
  modal.showModal()
})

closeModal.addEventListener('click', () => {
  modal.close()
})

// Reset the game through browser refresh
function resetGame() {
  window.location.reload();
}



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
    squares[currentPosition + index].style.backgroundColor = colours[random]
  })
}

function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino')
    squares[currentPosition + index].style.backgroundColor = ''
  })
}

// assigning Keycodes for movement
function control(e) {
  if(e.keyCode === 37) {
    moveLeft()
  } else if (e.keyCode === 38) {
    rotate()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 40) {
    moveDown()
  }
}
document.addEventListener('keyup', control)


// Move down
function moveDown() {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

// Freeze
function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    // starts a new tetromino to fall
    random = nextRandom
    nextRandom = Math.floor(Math.random() * allTetrominoes.length)
    current = allTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShapes()  
    scoreCount()
    gameOver()
  }
}

// define tetromino's edge to the left
function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if(!isAtLeftEdge) currentPosition -=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }
  draw()
}

// define tetromino's edge to the right
function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
  if(!isAtRightEdge) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }
  draw()
}

// rotates the tetromino
function rotate() {
  undraw()

  currentRotation ++
  if(currentRotation === current.length) { 
    currentRotation = 0
  }
  current = allTetrominoes[random][currentRotation]
  draw()
}

// Up-next tetromino display on mini-grid
const displaySquares = document.querySelectorAll('.the-mini-grid div')
const displayWidth = 4
let displayIndex = 0

// the Tetrominos [no rotations]
const upNextTetrominoes = [
  [1, displayWidth+1, displayWidth*2+1, 2],
  [0, displayWidth, displayWidth+1, displayWidth*2+1],
  [1, displayWidth, displayWidth+1, displayWidth+2],
  [0, 1, displayWidth, displayWidth+1],
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
]

// Display shapes in the mini grid display
function displayShapes() {
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
    square.style.backgroundColor = ''
  })
  upNextTetrominoes[nextRandom].forEach( index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
    displaySquares[displayIndex + index].style.backgroundColor = colours[nextRandom]
  })
}


// add functionalities to the start/stop buttonss
startBtn.addEventListener('click', () => {
  if(timerId) {
    clearInterval(timerId)
    timerId = null
  } else {
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random()*allTetrominoes.length)
    displayShapes()
  }
})

// Score count
function scoreCount() {
  for (let i = 0; i < 199; i +=width) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

    if(row.every(index => squares[index].classList.contains('taken'))) {
      score +=10
      scoreDisplay.innerHTML = score
      row.forEach(index => {
        squares[index].classList.remove('taken')
        squares[index].classList.remove('tetromino')
        squares[index].style.backgroundColor = ''
      })
      const squaresRemoved = squares.splice(i, width)
      squares = squaresRemoved.concat(squares)
      squares.forEach(cell => theGrid.appendChild(cell))
    }
  }
}


// game over yeahhhhhhhhhhhhhh
function gameOver() {
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    scoreDisplay.innerHTML = 'end'
    clearInterval(timerId)
  }
}