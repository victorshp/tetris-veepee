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

  // The Tetriminos
  // L, J, S, Z, T, O, I 
  const lTetrimino [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2+1, width*2+2],
    [1, width+1, width*2+1, width*3+1],
    [1, width+1, width*2+1, width*3+1]
  ]

  const jTetrimino [
    [0, 1, width+1, width*2+1],
    [width, width+1, width+2+1, width*2],
    [1, width+1, width*2+1, width*2+2],
    [width*2, width*2+1, width*2+2, width+2]
  ]

  const zTetrimino [
    [width, width+1, width*2+1, width*2+2],
    [2, width+1, width+2, width*2+1],
    [width, width+1, width*2+1, width*2+2],
    [2, width+1, width+2, width*2+1]
  ]

  const sTetrimino [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
  ]

  const tTetrimino [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetrimino [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]

  const iTetrimino [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]
})

 
