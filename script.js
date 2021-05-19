var board;
const player1 = 'O';
const player2 = 'X';
const win_combinations = [
    [0,1,2],
    [3,4,5],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

const cells = document.querySelectorAll(".cell");
startGame();

let startGame = () =>{
    document.querySelectorAll(".endgame").style.display = 'none';
    board = Array.from(Array(9).keys());
    console.log(board);
    for (var i=0;i<cells.length;i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false);
    }
}
let turnClick = (square) =>{
    if(typeof board[square.target.id] == 'number'){
        turn(square.target.id,player1)
        if(!checkTie()){
            turn(bestSpot(),player2);
        }
    }
    
}

let turn = (squareID,player) =>{
    board[squareID] = player;
    document.getElementById(squareID).innerText = player;
    let gameWon = checkWin(board,player);
    if(gameWon)
        gameOver(gameWon);

}

let checkWin = (board,player) =>{
    let plays = board.reduce((a,e,i) => (e==player)?a.concat(i) : a, []);
    let gameWon = null;
    for(let [index,win] of win_combinations.entries()){
         if(win.every(elem=> plays.indexOf(elem) >-1)){
            gameWon = {index:index,player:player};
            break;
         }
    }
    return gameWon;
}
let gameOver = (gameWon) =>{
    for(let index of win_combinations[gameWon.index]){
        document.getElementById(index).style.backgroundColor = gameWon.player == player1 ? "blue":"red";
    }
    for(var i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',turnClick,false);
    }
    declareWinner(gameWon.player == player1 ? "You win":"You lose");
}
let declareWinner = (who) => {
    document.querySelector(".endgame").style.display = 'block';
    document.querySelector(".endgame .text").innerText = who;
}
let emptySquares = () => {
    return board.filter(s=> typeof s == 'number');
}
let bestSpot = () =>{
    return emptySquares()[0];
}


let checkTie = () =>{
    if(emptySquares().length == 0){
        for(var i=0;i<cells.length;i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click',turnClick,false);
        }
        declareWinner("Tie Game")
        return true; 
    }
    return false;
}