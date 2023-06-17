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

    for (let i = 1; i <= 10; i++) {
        for (let z = 1; z <= 10; z++) {
            contextoCanvas.fillText(emojis['X'], elementsSize * i , elementsSize * z);   
        }
    }
}