// definicje zmiennych globalnych \\

var block = {
    x:120,
    y:0,
    type:0,
    rotation:0,
    mesh:[
            [false,false,false,false],
            [false,false,false,false],
            [false,false,false,false],
            [false,false,false,false]
        ]
};
var colors = new Array("#96EA5E","red","yellow","green","#FFA500","#FF00FF","#87CEFA");
var score = 0;
var level = 1;
var canvas;
var context;
var nextLvl = 1000;
var speed = 600;
var intervalId;
var pause = false;
//wyswietlacz

var nextBlock;
var screen;
var scrContext;
var nextMesh = [
            [false,false,false,false],
            [false,false,false,false],
            [false,false,false,false],
            [false,false,false,false]
        ];

// tablica reprezentujaca plansze
var board = new Array(21);
for (var i = 0; i < 21; i++) {
    board[i] = new Array(12);
    for (var j = 0; j < 12; j++) {
        if(i===20 || j===0 || j===11)
            board[i][j]=-1;
        else
            board[i][j]=0;
    }
}


///\\\///\\\///\\\///\\\///\\\///\\\

function main(){
    
    canvas = document.getElementById('canva');
    context = canvas.getContext('2d');
    
    screen = document.getElementById('canvSrc');
    scrContext = screen.getContext('2d');
    
    newBlock();
    setNextBlock();
    draw();
    
    intervalId = setInterval(updatePosition, speed);
    
    document.onkeydown = checkKey;
    
}
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for(var i = 0; i < 4 ; i++){
        for(var j =0; j < 4 ; j++){
            if(block.mesh[i][j] === true){
                context.fillStyle = colors[block.type];
                context.strokeStyle='white';
                context.globalAlpha = 0.5;
                context.fillRect(block.x + 30*j,block.y + 30*i,30,30);
                context.globalAlpha = 1;
                context.strokeRect(block.x + 30*j,block.y + 30*i,30,30);
                
                
            }
        } 
    }
    
    drawBoard();
    
    
}
function updatePosition(){
    
    if(checkIfGameOver() === true){
        showGameOver();
    }else{
    
        if(checkCollision()){
           fillBoard();
           newBlock(); 
           setNextBlock();
        }else
            block.y+= 30;

        checkLine();
        nextLevel();
        draw(); 

        document.getElementById('score').innerHTML ="Score: " + score;
        document.getElementById('level').innerHTML ="Level: " + level;
    }
}
function setMesh(type, emptyMesh){
    var tempMesh;
    switch (type){
        case 0:
            tempMesh = [
                [true,true,true,true],
                [false,false,false,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 1:
            tempMesh = [
                [true,true,false,false],
                [true,true,false,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 2:
            tempMesh = [
                [true,false,false,false],
                [true,true,true,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 3:
            tempMesh = [
                [false,false,true,false],
                [true,true,true,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 4:
            tempMesh = [
                [false,true,true,false],
                [true,true,false,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 5:
            tempMesh = [
                [true,true,false,false],
                [false,true,true,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 6:
            tempMesh = [
                [false,true,false,false],
                [true,true,true,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 7:
            tempMesh = [
                [true,false,false,false],
                [true,false,false,false],
                [true,false,false,false],
                [true,false,false,false]
            ];
            break;
        case 9:
            tempMesh = [
                [true,true,false,false],
                [true,false,false,false],
                [true,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 10:
            tempMesh = [
                [true,false,false,false],
                [true,false,false,false],
                [true,true,false,false],
                [false,false,false,false]
            ];
            break;
        case 11:
            tempMesh = [
                [true,false,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ];
            break;
        case 12:
            tempMesh = [
                [false,true,false,false],
                [true,true,false,false],
                [true,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 13:
            tempMesh = [
                [true,false,false,false],
                [true,true,false,false],
                [true,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 16:
            tempMesh = [
                [true,true,true,false],
                [false,false,true,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 17:
            tempMesh = [
                [true,true,true,false],
                [true,false,false,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 20:
            tempMesh = [
                [true,true,true,false],
                [false,true,false,false],
                [false,false,false,false],
                [false,false,false,false]
            ];
            break;
        case 23:
            tempMesh = [
                [false,true,false,false],
                [false,true,false,false],
                [true,true,false,false],
                [false,false,false,false]
            ];
            break;
        case 23:
            tempMesh = [
                [false,true,false,false],
                [false,true,false,false],
                [true,true,false,false],
                [false,false,false,false]
            ];
            break;
        case 24:
            tempMesh = [
                [true,true,false,false],
                [false,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ];
            break;
        case 27:
            tempMesh = [
                [false,true,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ];
            break;
    }
    if(emptyMesh === undefined)
        block.mesh = tempMesh;
    else
        nextMesh = tempMesh;
}

function checkKey(e) {

    switch (e.keyCode) {
        case 37:
            if(!pause && !checkCollision('left')){
                block.x-=30;
                draw();
            }
            break;
        case 39:
            if(!pause && !checkCollision('right')){
                block.x+=30;
                draw();
            }
            break;
        case 40:
            if(!pause)
                updatePosition();
            break;
        case 32: // spacja
            if(!pause && !checkCollision('rotate')){
                rotate();
                draw();
            }
            break;
        case 80: // "P"
            if(!pause){
                pause = true;
                context.clearRect(0, 0, canvas.width, canvas.height);
                showPause();
            }else{
                pause = false;
                draw();
                clearInterval(showText);
                intervalId = setInterval(updatePosition, speed);
            }
            break;
    }

}
function checkCollision(wall){
    if(wall === undefined){
        wall  = 'down';
    }
    var bX = (block.x / 30) + 1;
    var bY = (block.y / 30);
    
    if(wall === 'down'){
        for(var i = 0; i < 4 ; i++){
            for(var j =0; j < 4 ; j++){
                if(block.mesh[i][j] === true){
                    if(board[bY+i+1][bX+j] !==0)
                        return true;
                }
            }
        }
    }else if(wall === 'right'){
        for(var i = 0; i < 4 ; i++){
            for(var j =0; j < 4 ; j++){
                if(block.mesh[i][j] === true){
                    if(board[bY+i][bX+j+1] !==0)
                        return true;
                }
            }
        }
    }else if(wall === 'left'){
        for(var i = 0; i < 4 ; i++){
            for(var j =0; j < 4 ; j++){
                if(block.mesh[i][j] === true){
                    if(board[bY+i][bX+j-1] !==0)
                        return true;
                }
            }
        }
    }else if(wall === 'rotate'){
        if(block.type !== 0){
            for(var i = 0; i < 3 ; i++){
                for(var j =0; j < 3 ; j++){
                        if(board[bY+i][bX+j] !==0)
                            return true;
                }
            }
        }else{
            for(var i = 0; i < 4 ; i++){
                for(var j =0; j < 4 ; j++){
                        if(board[bY+i][bX+j] !==0)
                            return true;
                }
            }
        }
        
    }
    return false;
}

function drawBoard(){
    for(var i = 0; i < 20 ; i++){
        for(var j =1; j < 11 ; j++){
            if(board[i][j] !== 0){
                context.fillStyle = colors[board[i][j]];
                context.globalAlpha = 0.5;
                context.fillRect(30*j -30,30*i,30,30);
                context.globalAlpha = 1;
                context.strokeRect(30*j -30,30*i,30,30);
            }
        }
    }
}
function fillBoard(){
    
    var bX = (block.x / 30) + 1;
    var bY = (block.y / 30);
    
    for(var i = 0; i < 4 ; i++){
            for(var j =0; j < 4 ; j++){
                if(block.mesh[i][j] === true){
                    board[bY+i][bX+j] = block.type.toString();
                }
            }
    }
}
function newBlock(){
    block.y = 0;
    block.x = 120; 
    if(nextBlock === undefined)
        block.type = Math.floor(Math.random() * 7);
    else
        block.type = nextBlock;
    
    setMesh(block.type);
    block.rotation = block.type;
    
}
function rotate(){
    if (block.rotation === 0 || block.rotation === 7) {
        block.rotation = (block.rotation + 7) % 14;
    }
    if (block.rotation === 2 || block.rotation === 9 || block.rotation === 16 || block.rotation === 23) {
        block.rotation = ((block.rotation + 7) % 28);
    }
    if (block.rotation === 3 || block.rotation === 10 || block.rotation === 17 || block.rotation === 24) {
        block.rotation = ((block.rotation + 7) % 28);
    }
    if (block.rotation === 4 | block.rotation === 11) {
        block.rotation = ((block.rotation + 7) % 14);
    }
    if (block.rotation === 5 | block.rotation === 12) {
        block.rotation = ((block.rotation + 7) % 14);
    }
    if (block.rotation === 6 || block.rotation === 13 || block.rotation === 20 || block.rotation === 27) {
        block.rotation = ((block.rotation + 7) % 28);
    }
    setMesh(block.rotation);
}
function checkLine(){
    var lineCounter = 0;
    var inLine =0;
    for(var i = 0; i < 20 ; i++){
        for(var j =1; j < 11 ; j++){
            if(board[i][j] !== 0)
                inLine++;
        }
        if(inLine === 10){
            eraseLine(i);
            lineCounter++;
        }
        inLine = 0;
    }
    if(lineCounter>0){
        score += lineCounter * 100 + (lineCounter - 1) * 50;
    }
        
}
function eraseLine(line){
    for(var i = line; i >= 0 ; i--){
        for(var j =1; j < 11 ; j++){
            if(i !== 0)
                board[i][j] = board[i-1][j]; 
        }
    }
}
function checkIfGameOver(){
    for(var j =1; j < 11 ; j++){
        if(board[0][j] !== 0 )
            return true;
    }
    return false; 
}
function reset(){
    for (var i = 0; i < 20; i++) {
        for (var j = 1; j < 11; j++)
            board[i][j]=0;
    }
    score = 0;
    level = 1;
    speed = 600;
    intervalId = setInterval(updatePosition, speed);
    document.onkeydown = checkKey;
}
function setNextBlock(){
    nextBlock = Math.floor(Math.random() * 7);
    setMesh(nextBlock,nextMesh);
    
    scrContext.clearRect(0, 0, screen.width, screen.height);
    
    for(var i = 0; i < 4 ; i++){
        for(var j =0; j < 4 ; j++){
            if(nextMesh[i][j] === true){
                scrContext.fillStyle = colors[nextBlock];
                scrContext.strokeStyle='white';
                scrContext.globalAlpha = 0.5;
                scrContext.fillRect(30*j,30*i +30,30,30);
                scrContext.globalAlpha = 1;
                scrContext.strokeRect(30*j,30*i +30,30,30);
                
            }
        }
    }
}
function nextLevel(){
    if(score >= nextLvl){
        level++;
        nextLvl *= 2;
        if(speed > 100)
            speed -= 100;
        else if(speed === 100)
            speed = 50;
    }
}
function showGameOver(){
    
    clearInterval(intervalId);
    context.fillStyle = "black";
    context.fillRect(0,240,300,120);
    
    context.font = "30pt Orbitron";
    context.fillStyle = "white";
    context.fillText("GAME OVER",10,300);  
    context.font = "15pt Orbitron";
    flashyText("press space",80,330);    
    document.onkeydown = function(e){
        if(e.keyCode === 32){
            clearInterval(showText);
            reset();
        }   
    };
}
function flashyText(text,x,y) {
    var guardian = true;
    showText = setInterval(function() {
           if(guardian === true){
               context.fillStyle = "white";
               context.fillText(text,x,y);
               guardian = false;
           }else{
               context.fillStyle = "black";
               context.fillRect(0,y-30,300,40);
               guardian = true;
           }
        },500);
}
function showPause(){
    clearInterval(intervalId);
    context.fillStyle = "black";
    context.fillRect(0,240,300,120);
    
    context.font = "30pt Orbitron";
    flashyText("PAUSE",65,310);
}
