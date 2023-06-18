const canvas = document.querySelector('#game')
const contextoCanvas = canvas.getContext('2d')
const btnUp = document.querySelector('#up').addEventListener('click', function (event) {
    console.log("Hacia arriba",event);
})
const btnLeft = document.querySelector('#left').addEventListener('click', function (event) {
    console.log("Hacia la izquierda");
})
const btnRight = document.querySelector('#right').addEventListener('click', function (event) {
    console.log("Hacia la derecha");
})
const btnDown = document.querySelector('#down').addEventListener('click', function (event) {
    console.log("Hacia abajo", );
})

window.addEventListener('keydown', moveByKeys)

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

    const map = maps[0]
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

function moveByKeys (event) {
    switch (event.key) {
        case 'ArrowUp' : console.log('Hacia Arriba')
        break;
        case 'ArrowLeft' : console.log('Hacia la Izquierda')
        break;
        case 'ArrowRight' : console.log('Hacia la derecha')
        break;
        case 'ArrowDown' : console.log('Hacia Abajo')
        break;
        default : console.log('Presione las teclas de dirección');
    }
}

