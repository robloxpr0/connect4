function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);

  COLS = 7;
  ROWS= 6;
  boardWidth = 0;
  boardHeight = 0;
  boardXOffset = 0;
  boardYOffset = 0;
  whichColumn = -1;
  winner = null;
  resetButton = null;

  players = ["#f54242", "#f5f242"];
  playersBackground = ["#ff8282", "#fcfa83"]
  currentPlayer = 0;
  board = [
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
  ];

  backgroundColor = "#427ef5";
}

function checkFour(a, b, c, d){
  return a == b && b == c && c == d && d != "";
}

function checkWinner(){
  //in rows
  for(let i = 0; i < ROWS; i++){
    for(let j = 0; j <= COLS-4; j++){
      if(checkFour(board[i][j], board[i][j+1], board[i][j+2], board[i][j+3])){
        winner = board[i][j];
        return;
      }
    }
  }

  //in cols
  for(let i = 0; i < COLS; i++){
    for(let j = 0; j <= ROWS-4; j++){
      if(checkFour(board[j][i], board[j+1][i], board[j+2][i], board[j+3][i])){
        winner = board[j][i];
        return;
      }
    }
  }
}

function mousePressed(){
  if(winner != null){
    winner = null;
    resetButton.remove();
    currentPlayer = 0;
    board = [
      ["","","","","","",""],
      ["","","","","","",""],
      ["","","","","","",""],
      ["","","","","","",""],
      ["","","","","","",""],
      ["","","","","","",""],
    ];
    loop();
  }
  if(whichColumn != -1){
    for(let i = ROWS-1; i >= 0; i--){
      if(board[i][whichColumn] == ""){
        board[i][whichColumn] = players[currentPlayer];
        checkWinner();
        currentPlayer = (currentPlayer + 1)%2;
        return;
      }
    }
  }
}

function draw() {
  // put drawing code here
  resizeCanvas(windowWidth, windowHeight);
  
  boardWidth = 70*windowWidth/100;
  boardHeight = 90*windowHeight/100;
  
  boardXOffset = (windowWidth-boardWidth)/2;
  boardYOffset = (windowHeight-boardHeight)/2;
  
  let cellSize = boardWidth/COLS;
  let cellHeight = boardHeight/ROWS;
  let circleRadius = cellHeight < cellSize ? 90*cellHeight/100 : 90*cellSize/100;

  if(mouseX > boardXOffset && mouseX < boardXOffset + boardWidth){
    whichColumn = Math.floor((mouseX-boardXOffset)/cellSize);
  }else{
    whichColumn = -1;
  }

  translate(boardXOffset, boardYOffset);
  noStroke();

  for(let i = 0; i < ROWS; i++){
    for(let j = 0; j < COLS; j++){
      fill(backgroundColor);
      if(j == whichColumn){
        fill(playersBackground[currentPlayer]);
      }
      rect(cellSize*j, cellHeight*i, cellSize, cellHeight);
      fill("#fff");
      if(board[i][j] != ""){
        fill(board[i][j]);
      }
      ellipse(cellSize/2 + cellSize*j, cellHeight/2 + cellHeight*i, circleRadius);      
    }
  }

  if(winner != null){
    for(let i = 0; i < ROWS; i++){
      for(let j = 0; j < COLS; j++){
        fill(backgroundColor);
        rect(cellSize*j, cellHeight*i, cellSize, cellHeight);
        fill("#fff");
        if(board[i][j] != ""){
          fill(board[i][j]);
        }
        ellipse(cellSize/2 + cellSize*j, cellHeight/2 + cellHeight*i, circleRadius);      
      }
    }
    noLoop();
    let whoWon = winner == players[0] ? "red" : "yellow";
    resetButton = createButton(`${whoWon} won. click to reset`);
    resetButton.position(50, 50);
  }
}