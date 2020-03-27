function makeGrid(gridLength) {

    const containerPad = document.querySelector('.container-pad')
    const divSquare = document.createElement('div')



    divSquare.classList.add('grid-square')

    let gridSize = gridLength*gridLength;

    containerPad.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`
    containerPad.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`


    for (let i = 0; i < gridSize; i++) {
        const divSquare = document.createElement('div')
        divSquare.classList.add('grid-square')
        containerPad.appendChild(divSquare);
    }

    addGridListeners()    
}


function randomSaturation() {
    return Math.floor(Math.random()*50+50)
}

function randomColor() {
    return Math.floor(Math.random()*360)
}


function addGridListeners() {
    const gridSquares = document.querySelectorAll('.grid-square')
    gridSquares.forEach((gridSquare) => {
        gridSquare.addEventListener('mouseenter', () => {
            
            if (gridSquare.style.backgroundColor == "") {
                gridSquare.style.backgroundColor = `hsl(${randomColor()}, ${randomSaturation()}%, 50%)`
                gridSquare.style.borderColor = gridSquare.style.backgroundColor
            } else {
                let currentColor = gridSquare.style.backgroundColor
                gridSquare.style.backgroundColor = makeDarker(currentColor)
                gridSquare.style.borderColor = gridSquare.style.backgroundColor
            } 
        })
    })
}


function makeDarker(rgbString) {
    // strip down rgb string into only the values
    let rgbValues = rgbString.slice(rgbString.indexOf('(') + 1, rgbString.indexOf(')')).split(', ')

    let rgbNumArray = [];

    // Turn strings of values in array to numbers and reduce the values to 90%
    for (let index = 0; index < rgbValues.length; index++) {
        rgbNumArray.push(Math.floor(parseInt(rgbValues[index])*0.9-2))
    }

    let newRgbValues = `rgb(${rgbNumArray.join(', ')})`


    return newRgbValues
}


function clearGrid() {
    const oldGrid = document.querySelectorAll('.grid-square')
    const containerPad = document.querySelector('.container-pad')
    oldGrid.forEach(square => containerPad.removeChild(square))
}


newButton = document.querySelector('#button-new')
resetButton = document.querySelector('#button-reset')


newButton.onclick = () => {
    newGridLength = prompt('How many grids long should the new pad be?')
    clearGrid()
    makeGrid(newGridLength)
}


resetButton.onclick = () => {
    const currentGrid = document.querySelectorAll('.grid-square')
    let currentLength = Math.sqrt(currentGrid.length)
    clearGrid()
    makeGrid(currentLength)
}

makeGrid(10)