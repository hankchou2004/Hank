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
let tool1 = parseInt(sessionStorage.getItem('tool1')) || 6;
let tool2 = parseInt(sessionStorage.getItem('tool2')) || 6;
let tool3 = parseInt(sessionStorage.getItem('tool3')) || 6;
let useCoin =parseInt(sessionStorage.getItem('useCoin')) || 1;


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

function setTool3(newTool3) {
    tool3 = newTool3;
    sessionStorage.setItem('tool3', newTool3);
}

function getTool3() {
    return tool3;
}

//數字位置
function getx(value) {
    let x = 0;
    let counter = 10;

    // 根据计数器调整位置
    while (value / counter >= 1) {
        counter *= 10; // 计数器乘以 10
        x -= 11; // 每次增加一位数，向左移动固定距离
    }

    return x;
}

export {  setMoney, getMoney ,setTool1,getTool1,setTool2,getTool2,setTool3,getTool3,getx };
