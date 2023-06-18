const canvas = document.querySelector("#game")
const contextoCanvas = canvas.getContext('2d')

let canvasSize 
let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize () {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth *  0.8 
    } else {
        canvasSize = window.innerHeight * 0.8
    } 

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

     elementsSize = canvasSize / 10
     startGame()
}

function startGame () {
    contextoCanvas.font = elementsSize + 'px Verdana' 
    contextoCanvas.textAlign = 'end'

    const map = maps[1]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

     mapRowCols.forEach((row, rowI)=> {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementsSize * (rowI + 1)
            const posY = elementsSize * (colI + 1)
            contextoCanvas.fillText(emoji, posX + 12, posY - 9)
        })
     });
}
