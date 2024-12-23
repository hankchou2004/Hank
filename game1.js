import {  getMoney, setMoney,setTool1,getTool1,setTool2,getTool2} from './共用.js';
import { getboardColor, setboardColor,getballColor, setballColor,getblockColor, setblockColor,getplayerColor, setplayerColor,getwordColor, setwordColor} from './color.js';

// 更新 sharedData.money 為 sessionStorage 中的值
let money = getMoney();
let tool1 = getTool1();
let tool2 = getTool2();

//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

let usebomb=0;
let bombexplode=0;
let uselaser=0;
let laserbreak=0;
let useCoin=1;
//let coinquantity=0;
let countcoin=0;
let score = 0;
let gameOver = false;
let startgame = false;
//players

let playerWidth = 80; //500 for testing, 80 normal
let playerHeight = 10;
let playerVelocityX = 20; //move 10 pixels each time

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight ,
    width: playerWidth,
    height: playerHeight,
    velocityX : playerVelocityX
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ballsize=ballHeight;
let ballVelocityX = Math.random() > 0.5 ? 3 : -3; //15 for testing, 3 normal; //15 for testing, 3 normal
let ballVelocityY = -2; //10 for testing, 2 normal


let ball = {
    x : Math.random() * (boardWidth - ballWidth),
    y : boardHeight-ballHeight-playerHeight,
    width: ballWidth,
    height: ballHeight,
    size: ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}

//道具1
let bombWidth =20;
let bombHeight = 20;
let bombVelocityX = Math.random() > 0.5 ? 3 : -3; //15 for testing, 3 normal
let bombVelocityY = -2; //10 for testing, 2 normal

let bomb = {
    x: Math.random() * (boardWidth - bombWidth), // 随机生成 x 坐标
    y : boardHeight - playerHeight - 5,
    width: bombWidth,
    height: bombHeight,
    velocityX : bombVelocityX,
    velocityY : bombVelocityY
}
console.log(bomb.x); // 输出炸弹的随机生成位置

//道具2
let laserWidth = 30; 
let laserHeight = 30; 
let laserVelocityX =Math.random() > 0.5 ? 3 : -3; //15 for testing, 3 normal
let laserVelocityY = -2; 
let laser = {
    x: Math.random() * (boardWidth - bombWidth), // 随机生成 x 坐标
    y : boardHeight - playerHeight - 5,
    width: laserWidth,
    height: laserHeight,
    velocityX : laserVelocityX,
    velocityY : laserVelocityY
}
console.log(laser.x); 

// 新增變數來保存顏色
let ballColor = "white";  // 預設球顏色
let blockColor = "skyblue";  // 預設遊戲板顏色
let playerColor = "lightgreen";
let wordColor = "white";

//blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8; 
let blockRows = 3; //add more as game goes on
let blockMaxRows = 10; //limit how many rows
let blockCount = 0;

//starting block corners top left 
let blockX = 15;
let blockY = 45;




// 新增返回初始畫面按鈕的功能
document.getElementById("goToInitialScreen").addEventListener("click", function() {
    window.location.href = "遊戲初始畫面.html";
});

//道具1按鈕觸發
document.getElementById("tool1-button").addEventListener("click", function() {
    if(getTool1()>1&&usebomb==0){
        usebomb=1;
        bomb = {
            x: Math.random() * (boardWidth - bombWidth), // 随机生成 x 坐标
            y : boardHeight - playerHeight - 5,
            width: bombWidth,
            height: bombHeight,
            velocityX : bombVelocityX,
            velocityY : bombVelocityY
        }
        bombexplode = 0;
        console.log(bomb.x); // 输出炸弹的随机生成位置
        setTool1(getTool1()-1);
        }
});

//道具2按鈕觸發
document.getElementById("tool2-button").addEventListener("click", function() {
    if(getTool2()>1&&uselaser==0){
        uselaser=1;
        laser = {
            x: Math.random() * (boardWidth - bombWidth), // 随机生成 x 坐标
            y : boardHeight - playerHeight - 5,
            width: laserWidth,
            height: laserHeight,
            velocityX : laserVelocityX,
            velocityY : laserVelocityY
        }
        laserbreak=0;
        console.log(laser.x);
        setTool2(getTool2()-1);
        }
});

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    const savedBackgroundColor = sessionStorage.getItem('backgroundColor');
    if (savedBackgroundColor) {
        board.style.backgroundColor = savedBackgroundColor;
    }

    // 检查并应用球的颜色
    const savedBallColor = sessionStorage.getItem('ballColor');
    if (savedBallColor) {
        ballColor = savedBallColor;
    }

    // 检查并应用磚塊的颜色
    const savedBlockColor = sessionStorage.getItem('blockColor');
    if (savedBlockColor) {
        blockColor = savedBlockColor;
    }

    // 检查并应用玩家的颜色
    const savedPlayerColor = sessionStorage.getItem('playerColor');
    if (savedPlayerColor) {
        playerColor = savedPlayerColor;
    }

    // 检查并应用文字的颜色
    const savedWordColor = sessionStorage.getItem('wordColor');
    if (savedWordColor) {
        wordColor = savedWordColor;
    }
    
     //初始畫玩家
    //context.fillStyle = "skyblue";
    //context.fillRect(player.x, player.y, player.width, player.height);

    // 開始遊戲及控制
    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    // 創建方塊
    createBlocks();

    // 球的大小與速度控制
    const ballSizeInput = document.getElementById("ballsize");
    const totalSpeedInput = document.getElementById("totalSpeed");
    
    
    
    ballSizeInput.value = ball.height;
    totalSpeedInput.value = ball.velocityX + ball.velocityY// 初始總速度為 velocityX + velocityY

    
    document.getElementById("ballsizeValue").textContent = ball.size;
    document.getElementById("totalSpeedValue").textContent = ball.velocityX + ball.velocityY;
    

    
    ballSizeInput.addEventListener("input", function () {
        let newBallSize = parseInt(this.value);
        ballsize = newBallSize;
        ball.width = ballsize;
        ball.height = ballsize;
        document.getElementById("ballsizeValue").textContent = this.value;
        ball.y=boardHeight-ball.height-playerHeight;
        
    });

    
    totalSpeedInput.addEventListener("input", function () {
        const newTotalSpeed = parseInt(this.value); // 取得新的總速度
        document.getElementById("totalSpeedValue").textContent = newTotalSpeed; // 更新顯示總速度
        
        // 設定最大和最小速度
        const minSpeed = 1;
        const maxSpeed = 25;  // 設定最大速度，避免球速過快
        const clampedSpeed = Math.min(Math.max(newTotalSpeed, minSpeed), maxSpeed);
        
        // 根據總速度計算 X 和 Y 方向的速度 (保持 3:2 的比例)
        let newVelocityX = clampedSpeed * 3 / 5;  // 計算 X 軸速度
        let newVelocityY = clampedSpeed * 2 / 5;  // 計算 Y 軸速度
        
        // 更新球的速度
        ball.velocityX = newVelocityX;
        ball.velocityY = newVelocityY;
        
        // 更新顯示的速度
        document.getElementById("ballSpeedXValue").textContent = newVelocityX;
        document.getElementById("ballSpeedYValue").textContent = newVelocityY;
    });
    
    
    
    
};



// 計算得分調整因子
function calculateScoreAdjustmentFactor() {
    let ballArea = ball.width;
    let ballSpeed = Math.abs(ball.velocityX) + Math.abs(ball.velocityY);
    let totalscore = ballSpeed * ballSpeed * 20;
    let finallscore = Math.round(totalscore / ballArea);
    return (finallscore);
}

//遊戲開始前畫面
function renderInitialState() {
    // 绘制所有内容，包括砖块、球、玩家、道具和金币
    context.clearRect(0, 0, board.width, board.height);

    // 绘制玩家
    context.fillStyle = playerColor;
    context.fillRect(player.x, player.y, player.width, player.height);

    // 绘制球
    context.fillStyle = ballColor;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // 绘制所有砖块
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            context.fillStyle = blockColor;
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }
    //score
  context.font = "20px sans-serif";
  context.fillStyle = wordColor;
  context.fillText(score, 10, 25);

   //coin
   context.font = "20px sans-serif";
   context.fillStyle = wordColor;
   context.fillText(getMoney()-1,470, 25);
  
   //usecoin
    context.font = "20px sans-serif";
    context.fillStyle = wordColor;
    context.fillText(useCoin,470, 42);

    //道具1
   //context.font = "15px sans-serif";
   //context.fillStyle = wordColor;
   //context.fillText("爆炸",465, 180);
   context.font = "20px sans-serif";
   context.fillText(getTool1()-1,470, 175);
   //道具2
   //context.font = "15px sans-serif";
   //context.fillStyle = wordColor;
   //context.fillText("穿透",465, 240);
   context.font = "20px sans-serif";
   context.fillText(getTool2()-1,470, 235);

    // 显示提示信息：按空白键开始游戏
    context.font = "20px sans-serif";
    context.fillStyle = wordColor;
    context.fillText("Press 'Space' to Start the Game", 100, 350);  // 显示提示信息
}

// 更新遊戲畫面
function update() {
    requestAnimationFrame(update);
    if (!startgame) {
        renderInitialState();  // 绘制初始状态的所有元素
        return;  // 不进行后续绘制，等待玩家按下空白键开始游戏
    }
    if (gameOver) {
       
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // 繪製玩家
    context.fillStyle = playerColor;
    context.fillRect(player.x, player.y, player.width, player.height);

    // 更新球的位置
    context.fillStyle = ballColor;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // 撞擊玩家邊界
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;
    } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;
    }

    if (ball.y <= 0) { 
        ball.velocityY *= -1; // 反彈
    }
    else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
        ball.velocityX *= -1;
    }
    else if (ball.y + ball.height > boardHeight) {
        context.font = "15px sans-serif";
                context.fillStyle = wordColor;
                context.fillText("Game Over: Press 'Space' to Restart", 80, 350);
                if(getMoney()>1&&useCoin==1){
                    context.font = "15px sans-serif";
                    context.fillStyle = wordColor;
                    context.fillText("You have coin,if you want to revive,Press 'R'", 80, 300);
                } 
                gameOver = true;
    }

     // bomb
	if(usebomb==1&&bombexplode==0){
        context.fillStyle = "red";
        bomb.x += bomb.velocityX;
        bomb.y += bomb.velocityY;
        context.fillRect(bomb.x, bomb.y, bomb.width, bomb.height);

        if (bomb.y <= 0) { 
        // if bomb touches top of canvas
               bomb.velocityY *= -1; //reverse direction
        }
        else if (bomb.x <= 0 || (bomb.x + bomb.width >= boardWidth)) {
        // if bomb touches left or right of canvas
            bomb.velocityX *= -1; //reverse direction
        }
        else if (bomb.y + bomb.height -15> boardHeight) {
            // if laser touches bottom of canvas
            bombexplode=1;
            usebomb=0;
            }
    }

    // 穿透
	if(uselaser==1&&laserbreak==0){
        context.fillStyle = "yellow";
        laser.x += laser.velocityX;
        laser.y += laser.velocityY;
        context.fillRect(laser.x, laser.y, laser.width, laser.height);

        if (laser.y <= 0) { 
        // if laser touches top of canvas
               laser.velocityY *= -1; //reverse direction
        }
        else if (laser.x <= 0 || (laser.x + laser.width >= boardWidth)) {
        // if laser touches left or right of canvas
            laser.velocityX *= -1; //reverse direction
        }
        else if (laser.y + laser.height -15> boardHeight) {
        // if laser touches bottom of canvas
        laserbreak=1;
        uselaser=0;
        }
    }

    // 繪製方塊
    context.fillStyle = blockColor;
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1;
                score += calculateScoreAdjustmentFactor() ;
                blockCount -= 1;
                countcoin+=calculateScoreAdjustmentFactor();
                if(countcoin/2500>=1){
                    setMoney(getMoney()+1);
                    countcoin-=2500;
                }
            }
            else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;
                ball.velocityX *= -1;
                score += calculateScoreAdjustmentFactor() ;
                blockCount -= 1;
                countcoin+=calculateScoreAdjustmentFactor();
                if(countcoin/2500>=1){
                    setMoney(getMoney()+1);
                    countcoin-=2500;
                }
            }
            
            if (!bombexplode&&(topCollision(bomb, block) || bottomCollision(bomb, block)||leftCollision(bomb, block)|| 		rightCollision(bomb, block))) {
                bombexplode=1;
                usebomb=0;
                block.break = true; // 磚塊被打破
                score += 100;
                blockCount -= 1;
                countcoin+=calculateScoreAdjustmentFactor();
                if(countcoin/2500>=1){
                    setMoney(getMoney()+1);
                    countcoin-=2500;
                }
            // 波及周围一圈方块
                destroySurroundingBlocks(block);
            }

            //穿透覆蓋磚頭
            if(!laserbreak&&(topCollision(laser, block)||bottomCollision(laser, block)||leftCollision(laser,block)|| 		rightCollision(laser, block))) {
                    block.break = true; // 磚塊被打破
                    score += 100;
                    blockCount -= 1;
                    countcoin+=calculateScoreAdjustmentFactor();
                    if(countcoin/2500>=1){
                        setMoney(getMoney()+1);
                        countcoin-=2500;
                    }
            }
        
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    //next level
        if (blockCount == 0&&(ball.y + ball.height+10 >= boardHeight)) {
            score += 100; //bonus points :)
            blockRows = Math.min(blockRows + 1, blockMaxRows);
            createBlocks();
        }
      //score
      context.font = "20px sans-serif";
      context.fillStyle = wordColor;
      context.fillText(score, 10, 25);
    
       //coin
       context.font = "20px sans-serif";
       context.fillStyle = wordColor;
       context.fillText(getMoney()-1,470, 25);
      
       //usecoin
        context.font = "20px sans-serif";
        context.fillStyle = wordColor;
        context.fillText(useCoin,470, 42);
    
        //道具1
       //context.font = "15px sans-serif";
       //context.fillStyle = wordColor;
       //context.fillText("爆炸",465, 180);
       context.font = "20px sans-serif";
       context.fillText(getTool1()-1,470,175);
       //道具2
       //context.font = "15px sans-serif";
       //context.fillStyle = wordColor;
       //context.fillText("穿透",465, 240);
       context.font = "20px sans-serif";
       context.fillText(getTool2()-1,470, 235);
}

// 其餘的邏輯（碰撞檢測、玩家移動等）可以保持不變


function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
    if (gameOver) {
        if (e.code == "Space"||useCoin==0) {
            resetGame();
            console.log("RESET");
        }
        
        else if (e.code=="KeyR" && money>0) {
            ContinueGame();
            console.log("REVIVE");
        }
        
        return;
    }

    if(!startgame){
        if (e.code == "Space") {
            startgame=true;
            console.log("RESET");
        }
    }

    if (e.code == "ArrowLeft") {
        // player.x -= player.velocityX;
        let nextplayerX = player.x - player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    }
    else if (e.code == "ArrowRight") {
        let nextplayerX = player.x + player.velocityX;
        if (nextplayerX >= 0 && nextplayerX + player.width <= boardWidth) {
            player.x = nextplayerX;
        }

           
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function topCollision(ball, block) { //a is above b (ball is above block)
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) { //a is above b (ball is below block)
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) { //a is left of b (ball is left of block)
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block) { //a is right of b (ball is right of block)
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockArray = []; //clear blockArray
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10, //c*10 space 10 pixels apart columns
                y : blockY + r*blockHeight + r*10, //r*10 space 10 pixels apart rows
                width : blockWidth,
                height : blockHeight,
                break : false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

function ContinueGame() {
    if (getMoney() > 1) {
        setMoney(getMoney()-1);
        useCoin=0;
        gameOver = false;
        player.x = boardWidth / 2 - playerWidth / 2;
        ball.x = Math.random() * (boardWidth - ballWidth),
        ball.y = boardHeight-ballHeight-15,
        ball.velocityX = ballVelocityX;
        ball.velocityY = ballVelocityY;
        
    }
}

function resetGame() {
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeight - playerHeight ,
        width: playerWidth,
        height: playerHeight,
        velocityX : playerVelocityX
    }
    ball = {
        x : Math.random() * (boardWidth - ballWidth),
        y : boardHeight-ball.height-playerHeight,
        width: ball.width,  
        height: ball.height,
        velocityX : ball.velocityX,
        velocityY : ball.velocityY
    }
    bomb = {
        x: Math.random() * (boardWidth - bombWidth), // 随机生成 x 坐标
        y : boardHeight - playerHeight - 5,
        width: bombWidth,
        height: bombHeight,
        velocityX : bombVelocityX,
        velocityY : bombVelocityY
    }
    bombexplode = 0;
    console.log(bomb.x); // 输出炸弹的随机生成位置

    laser = {
    	x: Math.random() * (boardWidth - bombWidth), // 随机生成 x 坐标
    	y : boardHeight - playerHeight - 5,
    	width: laserWidth,
    	height: laserHeight,
    	velocityX : laserVelocityX,
    	velocityY : laserVelocityY
    }
    laserbreak=0;
    console.log(laser.x); 
    
    blockArray = [];
    blockRows = 3;
    score = 0;
    useCoin=1;
    createBlocks();
}

//波及周圍磚頭
function destroySurroundingBlocks(centerBlock) {
    let surroundingOffsets = [
        { dx: -1, dy: -1 }, // 左上
        { dx: 0, dy: -1 },  // 上
        { dx: 1, dy: -1 },  // 右上
        { dx: -1, dy: 0 },  // 左
        { dx: 1, dy: 0 },   // 右
        { dx: -1, dy: 1 },  // 左下
        { dx: 0, dy: 1 },   // 下
        { dx: 1, dy: 1 }    // 右下
    ];                                                                                                                                                                             

    for (let offset of surroundingOffsets) {
        let targetX = centerBlock.x + offset.dx * (blockWidth + 10); // 10 是间隔
        let targetY = centerBlock.y + offset.dy * (blockHeight + 10);

        for (let block of blockArray) {
            if (!block.break && block.x === targetX && block.y === targetY) {
                    block.break = true; // 磚塊被打破
                    score += 100;
                    blockCount -= 1;
                    countcoin+=calculateScoreAdjustmentFactor();
                if(countcoin/2500>=1){
                    setMoney(getMoney()+1);
                    countcoin-=2500;
                }
                }                                                                                                                       
            }
        }
    }
