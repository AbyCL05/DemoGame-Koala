const canvas = document.querySelector('#game')
const contextoCanvas = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const record = document.querySelector('#record')
const pResult = document.querySelector('#result')
const btnStart = document.querySelector('#start')
const btnRestart = document.querySelector('#restart')


btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)
btnStart.addEventListener('click', startTimer)
btnRestart.addEventListener('click', _ => {
    location.reload()
})

document.addEventListener('keydown', moveByKeys)

let canvasSize 
let elementsSize
let level = 0
let lives = 3

let timeStart 
let timePlayer
let timeInterval


const playerPosition = {
    x: undefined,
    y: undefined, 
};
const giftPosition = {
    x: undefined,
    y: undefined, 
};

let enemyPositions = []

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize () {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth *  0.7
    } else {
        canvasSize = window.innerHeight * 0.7
    } 

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

     elementsSize = canvasSize / 10
     playerPosition.x = undefined
     playerPosition.y = undefined
     startGame()
}

function startTimer() {
    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
        startGame()
    }
}

function startGame () {
    contextoCanvas.font = ( elementsSize - 8) + 'px Verdana' 
    contextoCanvas.textAlign = 'end'

    const map = maps[level]

    if (!map) {
        clearInterval(timeInterval)
        gameWin();
        return 
    }

    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    showLives()
    enemyPositions = []
    contextoCanvas.clearRect(0, 0, canvasSize, canvasSize)

     mapRowCols.forEach((row, rowI)=> {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementsSize * (rowI + 1)
            const posY = elementsSize * (colI + 1)

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX 
                playerPosition.y = posY 
                }
            } else if (col == 'I') {
                giftPosition.x = posX
                giftPosition.y = posY
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY
                })
            }
            contextoCanvas.fillText(emoji, posX + 4 , posY - 10)
        })
     });
     movePlayer()
}

function movePlayer () {
    const giftCollisionX = playerPosition.x.toFixed(0) == giftPosition.x.toFixed(0)
    const giftCollisionY = playerPosition.y.toFixed(0)== giftPosition.y.toFixed(0)
    const giftCollision = giftCollisionX && giftCollisionY
    if (giftCollision) {
        levelWin()
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(0) == playerPosition.x.toFixed(0)
        const enemyCollisionY = enemy.y.toFixed(0) == playerPosition.y.toFixed(0)
        return enemyCollisionX && enemyCollisionY
    })

    if (enemyCollision) {
        console.log('El oso te comió');
        levelFail()
    }
    contextoCanvas.fillText(emojis['PLAYER'], playerPosition.x , playerPosition.y - 3)
}

function levelWin() {
    console.log(`Terminaste el mapa ${level + 1}`);
    level++
    startGame()
}
function levelFail () {
    lives--
    if (lives <= 0) {
        level = 0
        lives = 3
        timeStart = undefined
        clearInterval(timeInterval)
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}
function gameWin() {
    console.log('Terminaste')
    records()
}

function records () {
    const recordTime = localStorage.getItem('record_time')
    const playerTime = Date.now() - timeStart

    if(recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML = 'Superaste el record!!!'
            clearInterval(timeInterval)
        } else {
            pResult.innerHTML = 'No superaste el record'
        }
    } else {
        localStorage.setItem('record_time', playerTime)
        pResult.innerHTML = 'Primera vez?, Es un nuevo record'
    }
}

function showLives () {
    const heartsLives = Array(lives).fill(emojis['HEART'])
    spanLives.innerHTML = heartsLives.join('') 
}

function showTime () {
    spanTime.innerHTML = timer(Date.now() - timeStart)
}

function showRecord () {
    record.innerHTML = timer(localStorage.getItem('record_time'))
}

function timer (ms) {
    const cs = parseInt(ms/10) % 100
    const seg = parseInt(ms/1000) % 60
    const min = parseInt(ms/60000) % 60

    const strCs = `${cs}`.padStart(2, '0')
    const strSeg = `${seg}`.padStart(2, '0')
    const strMin = `${min}`.padStart(2, '0')

    return `${strMin}:${strSeg}:${strCs}`
}


//Mover por botones o teclas
function moveByKeys (event) {
    switch (event.key) {
        case 'ArrowUp' : moveUp()
        break;
        case 'ArrowLeft' : moveLeft()
        break;
        case 'ArrowRight' : moveRight()
        break;
        case 'ArrowDown' : moveDown()
        break;
        default : console.log('Presione las teclas de dirección');
    }
}
function moveUp () {
    if (Math.ceil(playerPosition.y - elementsSize) <  elementsSize) {
        console.log('No te salgas');
    } else {
        playerPosition.y -= elementsSize
        startGame()
    }
}
function moveLeft () {
    if (Math.ceil(playerPosition.x - elementsSize) < elementsSize) {
        console.log('');
    } else {
        playerPosition.x -= elementsSize
        startGame()
    }
}
function moveRight () {
    if(Math.ceil(playerPosition.x + elementsSize) > canvasSize) {
        console.log('no salgas');
    } else {
        playerPosition.x += elementsSize
        startGame()
    }
}
function moveDown () {
    if (Math.ceil(playerPosition.y + elementsSize) > canvasSize) {
        console.log('no salgas');
    } else {
        playerPosition.y += elementsSize
        startGame()
    }
}
