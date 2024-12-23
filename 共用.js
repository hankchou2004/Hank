import { getboardColor, setboardColor,getwordColor, setwordColor } from './color.js';

//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 



window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
   
    
    
    
    const savedBackgroundColor = sessionStorage.getItem('backgroundColor');
    if (savedBackgroundColor) {
        board.style.backgroundColor = savedBackgroundColor;
    }

    
}



// 共用.js
let money = parseInt(sessionStorage.getItem('money')) || 51; // 從 sessionStorage 讀取金額，若無則使用預設值 10
let tool1 = parseInt(sessionStorage.getItem('tool1')) || 51;
let tool2 = parseInt(sessionStorage.getItem('tool2')) || 51;



function setMoney(newMoney) {
    money = newMoney;
    sessionStorage.setItem('money', newMoney);
}

function getMoney() {
    return money;
}

function setTool1(newTool1) {
    tool1 = newTool1;
    sessionStorage.setItem('tool1', newTool1);
}

function getTool1() {
    return tool1;
}

function setTool2(newTool2) {
    tool2 = newTool2;
    sessionStorage.setItem('tool2', newTool2);
}

function getTool2() {
    return tool2;
}

export {  setMoney, getMoney ,setTool1,getTool1,setTool2,getTool2 };
