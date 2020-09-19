// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

document.addEventListener('DOMContentLoaded', () => {
  // gets the grid and assigns it to grid. Affecting the element of class grid
  const grid = document.querySelector(".grid")
  // collect all divs in grid and turn into array
  let squares = Array.from(document.querySelectorAll(".grid div"))
  const scoreDisplay = document.querySelector("#score")
  const startBtn = document.querySelector("#start-button") 
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
  ]

  // The Tetriminos
  // L, J, S, Z, T, O, I 
  const lTetrimino = [
    [0, 1, width+1, width*2+1],
    [width+2, width*2, width*2+1, width*2+2],
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2]
  ]

  const jTetrimino = [
    [1, 2, width+1, width*2+1],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2, width*2+1],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetrimino = [
    [0, 1, width+1, width+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [2, width+1, width+2, width*2+1]
  ]

  const sTetrimino = [
    [1, 2, width, width+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [1, width+1, width+2, width*2+2]
  ]

  const tTetrimino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetrimino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]

  const iTetrimino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [2, width+2, width*2+2, width*3+2],
    [width*2, width*2+1, width*2+2, width*2+3]
  ]

  const theTetriminos = [ lTetrimino, jTetrimino, sTetrimino, zTetrimino, tTetrimino, oTetrimino, iTetrimino]

  let currentPosition = 4
  let currentRotation = 0

  // randomly select a Tetrimino
  let random = Math.floor(Math.random()*theTetriminos.length)
  let current = theTetriminos[random][currentRotation]

  // draw the tetrimino
  const draw = () => {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetrimino')
    })
  }


  // undraw the tetrimino
  const undraw = () => {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetrimino')
    })
  }
 
  // freeze function - if any square underneath the current tetrimino contains the class taken, add the class taken to that tetrimino, freezing it and launch another random tetrimino piece.
    // think width 10 and cP 4. It will check square of index 14, then 24, then 34, and so on...
  const freeze = () => {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // start new tetrimino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetriminos.length)
      current = theTetriminos[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  // moveDown funcion
  moveDown = () => {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  // make the tetriminos move down every second
  // timerId = setInterval(moveDown, 250)

  // Assign functions to KeyCodes - JS listens to which keys are pressed
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if(e.keyCode === 39) {
      moveRight()
    } else if(e.keyCode === 38) {
      rotate()
    } else if(e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

  // Move tetrimino left unless it's at the edge or there's a blockage.
  const moveLeft = () => {
    undraw()
    // if current is at square index multiples of 10 or 0, its at the Left Edge.  
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    // If not at left Edge, currentPosition reduces one so the tetrimino to the left. Also, if there is a tetrimino in left, meaning a div with taken to the left, go back to the right, appearing not to move.
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
  }

  // Move tetrimino right unless it's at the edge or there's a blockage.
  const moveRight = () => {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if(!isAtRightEdge) currentPosition += 1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }
    draw()
  }

  // Rotate the tetrimino
  rotate = () => {
    undraw()
    currentRotation++
    if(currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetriminos[random][currentRotation]
    draw()
  }

  // Next tetrimino box in mini-grid display
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0
    // Tetriminos without rotations
  const upNextTetriminos = [
    [1, 2, displayWidth+2, displayWidth*2+2],
    [1, 2, displayWidth+1, displayWidth*2+1],
    [2, 3, displayWidth+1, displayWidth+2],
    [1, 2, displayWidth+2, displayWidth+3],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [1, 2, displayWidth+1, displayWidth+2],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
  ]
    // function that will display the shape
  displayShape = () => {
      // remove any trace of a tetrimino from the mini grid to clean it up
    displaySquares.forEach(square => {
      square.classList.remove('tetrimino')
    })
    upNextTetriminos[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetrimino')
    })
  }

  // Start button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown,250)
      nextRandom = Math.floor(Math.random() * theTetriminos.length)
      displayShape()
    }
  })

  // add score
  addScore = () => {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score += 10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetrimino')
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  gameOver = () => {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'END'
      clearInterval(timerId)
    }
  }

})  
