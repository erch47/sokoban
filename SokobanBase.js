
/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/

/*   Enum of CSS Classes for the static elements   */
var Tiles = {
    Wall: "tile-wall",
    Space: "tile-space",
    Goal: "tile-goal"
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
    Character: "entity-player",
    Block: "entity-block",
    BlockDone: "entity-block-goal"
};

/*  Legend
    W = Wall
    B = Movable block
    P = Player starting position
    G = Goal area for the blocks
*/
var tileMap01 = {
    width: 19,
    height: 16,
    mapGrid: [
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], ['B'], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], ['W'], ['W'], ['W'], [' '], [' '], ['B'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], ['W'], [' '], [' '], ['B'], [' '], ['B'], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [['W'], ['W'], ['W'], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
    [['W'], [' '], [' '], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
    [['W'], [' '], ['B'], [' '], [' '], ['B'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], ['G'], ['G'], ['W']],
    [['W'], ['W'], ['W'], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], [' '], ['W'], ['P'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
    [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
    [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']]
    ]
};


const gameboard = document.getElementById('game-board')
const startPos = {x: 11, y: 11}

const makeMap = function(gameboard, mapGrid){
    gameboard.innerText = ''
    for(let i = 0; i < mapGrid.length; i++){
        for(let j = 0; j < mapGrid[i].length; j++){
            const html = `<div class="${mapGrid[i][j].join(' ')}"></div>`
            gameboard.insertAdjacentHTML('beforeend', html)
        }
    }
}

makeMap(gameboard, tileMap01.mapGrid)

const checkWin = function(){
    let win = false
    if(tileMap01.mapGrid[11][16].includes('B') && tileMap01.mapGrid[11][17].includes('B') && tileMap01.mapGrid[10][16].includes('B') && tileMap01.mapGrid[10][17].includes('B') && tileMap01.mapGrid[9][16].includes('B') && tileMap01.mapGrid[9][17].includes('B')){
        win = true
    }
    return win
}

const move = function(currentPos, nextPos, boxPos){
    if (nextPos.includes('W') || (nextPos.includes('B') && (boxPos.includes('W') || boxPos.includes('B')))){
        throw 'error'
    }

    if(currentPos.length > 1){
        currentPos.pop()
    } 
    else {
        currentPos[0] = ' '
    }


    if(nextPos.includes('B')){
        if(boxPos.includes(' ')){
            boxPos[0] = 'B'
        }
        else{
            boxPos.push('B')
        }
        nextPos[nextPos.indexOf('B')] = 'P'
    } 
    else {
        if(nextPos.includes(' ')){
            nextPos[0] = 'P'
        } 
        else{
            nextPos.push('P')
        }
        
    }
    makeMap(gameboard, tileMap01.mapGrid)
}


window.addEventListener('keydown', (event) => {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
    }
    
    if (checkWin()) return

    let currentPos, nextPos, boxPos
    switch(event.key){
        case 'ArrowUp':
            currentPos = tileMap01.mapGrid[startPos.x][startPos.y]
            nextPos = tileMap01.mapGrid[startPos.x - 1][startPos.y]
            boxPos = tileMap01.mapGrid[startPos.x - 2][startPos.y]
            try{
                move(currentPos, nextPos, boxPos)
                startPos.x -= 1
            }
            catch(err){

            }

            break
        case 'ArrowDown':
            currentPos = tileMap01.mapGrid[startPos.x][startPos.y]
            nextPos = tileMap01.mapGrid[startPos.x + 1][startPos.y]
            boxPos = tileMap01.mapGrid[startPos.x + 2][startPos.y]
            try{
                move(currentPos, nextPos, boxPos)
                startPos.x += 1
            }
            catch(err){

            }
            break
        case 'ArrowLeft':
            currentPos = tileMap01.mapGrid[startPos.x][startPos.y]
            nextPos = tileMap01.mapGrid[startPos.x][startPos.y - 1]
            boxPos = tileMap01.mapGrid[startPos.x][startPos.y - 2]
            try{
                move(currentPos, nextPos, boxPos)
                startPos.y -= 1
            }
            catch(err){

            }
            break
        case 'ArrowRight':
            currentPos = tileMap01.mapGrid[startPos.x][startPos.y]
            nextPos = tileMap01.mapGrid[startPos.x][startPos.y + 1]
            boxPos = tileMap01.mapGrid[startPos.x][startPos.y + 2]
            try{
                move(currentPos, nextPos, boxPos)
                startPos.y += 1
            }
            catch(err){
    
            }
            break
        default:
            break
    }
})