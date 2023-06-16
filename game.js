const canvas = document.querySelector("#game")
const contextoCanvas = canvas.getContext('2d')

window.addEventListener('load', startGame)


function startGame () {
    //Tamaño del canvas responsivo
    let canvasSize 
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth *  0.8 
    } else {
        canvasSize = window.innerHeight * 0.8
    } 

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    // Tamaño de los elementos del canvas respecto al tamaño de este
    const elementsSize = canvasSize / 10
    contextoCanvas.font = elementsSize + 'px Verdana' 
    contextoCanvas.textAlign = 'end'

    for (let i = 1; i <= 10; i++) {
        contextoCanvas.fillText(emojis['X'], elementsSize * i , elementsSize);
    }
}