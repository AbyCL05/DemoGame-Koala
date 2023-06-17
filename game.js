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

    /*renderizar el mapa. Crear el array bidimensional de filas y columnas. Limpiando los strings con trim y creando cada elemento del array con split */
    const map = maps[1]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    /*Se recorre el objeto emojis para encontrar al emoji equivalente al caracter que retorne el array mapRowCols, al que se le recorre tanto las filas como las columnas*/
    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            /*Por canvas las iteraciones de los ciclos for, comienzan en 1, pero para recorrer los arrays nesecitamos empezar en 0, por eso en filText, se le resta 1 a row y a col. Asi se renderiza el emoji correcto en la posicion corrrecta del canvas*/
            contextoCanvas.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * row +12 , elementsSize * col - 8);   
        }
    }
}
