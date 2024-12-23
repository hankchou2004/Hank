import {  getMoney, setMoney,setTool1,getTool1,setTool2,getTool2 } from './共用.js';
import { getboardColor, setboardColor,getwordColor, setwordColor } from './color.js';

// 更新 sharedData.money 為 sessionStorage 中的值
let money = getMoney();
let tool1 = getTool2();
let tool2 = getTool2();

//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//遊戲初始
let useCoin=1;
//let coinquantity=2;
let countcoin=0;
let score = 0;


let wordColor = "white";


// 新增返回初始畫面按鈕的功能
document.getElementById("goToInitialScreen").addEventListener("click", function() {
    window.location.href = "index.html";
});


// 當前提示
let currentPrompt = null; // 當前提示道具 ("tool1" 或 "tool2")
let promptPosition = null; // 提示文字的位置
let nomoney= 0; // 是否餘額不足

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
    requestAnimationFrame(update);
    
    document.getElementById("tool1-button").addEventListener("click", () => {showPrompt("tool1",100);
    nomoney = 0;
    });
    document.getElementById("tool2-button").addEventListener("click", () => {showPrompt("tool2",320);
    nomoney = 0;
    });
    document.addEventListener("keydown", handleKeyPress);  
    
    const savedBackgroundColor = sessionStorage.getItem('backgroundColor');
    if (savedBackgroundColor) {
        board.style.backgroundColor = savedBackgroundColor;
    }

    // 检查并应用文字的颜色
    const savedWordColor = sessionStorage.getItem('wordColor');
    if (savedWordColor) {
        wordColor = savedWordColor;
        

}
}
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    
    //coin
   context.font = "20px sans-serif";
   context.fillStyle = wordColor;
   context.fillText(getMoney()-1,460, 25);
  
   //道具1
   context.font = "15px sans-serif";
   context.fillStyle = wordColor;
   context.fillText("道具1",455, 180);
   context.font = "20px sans-serif";
   context.fillText(getTool1()-1,470,205);
   //道具2
   context.font = "15px sans-serif";
   context.fillStyle = wordColor;
   context.fillText("道具2",455, 240);
   context.font = "20px sans-serif";
   context.fillText(getTool2()-1,470, 265);

   //如果有按下按鈕，顯示提示文字
   if (currentPrompt) {
        context.font = "15px sans-serif";
        context.fillStyle = wordColor;
        context.fillText("確定購買? (Y/N)", promptPosition,200 );   
   }
   if(nomoney){
        context.font = "15px sans-serif";
        context.fillStyle = wordColor;
	context.fillText("金幣不足", promptPosition,200 );

   }


}

function showPrompt(tool, position) {
    currentPrompt = tool; // 設定當前提示道具
    promptPosition = position; // 提示顯示位置
}


// 處理鍵盤按鍵
function handleKeyPress(e) {
    if (!currentPrompt) return; // 如果沒有提示，不執行任何操作

    if (e.code === "KeyY") { // 檢查按下的鍵是否是 "Y"
        // 確定購買
        if (getMoney() > 1) {
            setMoney(getMoney()-1); // 扣除硬幣
            if (currentPrompt === "tool1") {
                setTool1(getTool1()+1); // 增加道具1數量
            } else if (currentPrompt === "tool2") {
                setTool2(getTool2()+1); // 增加道具2數量
            }
        } else {
            currentPrompt = null; // 清除提示
	        nomoney=1;
        }
        currentPrompt = null; // 清除提示
    } else if (e.code === "KeyN") { // 檢查按下的鍵是否是 "N"
        // 取消購買
        currentPrompt = null; // 清除提示
    }
}



