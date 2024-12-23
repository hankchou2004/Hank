// 設置背景顏色到 sessionStorage
export function setboardColor(key, color) {
    sessionStorage.setItem(key, color);
}

// 從 sessionStorage 讀取背景顏色
export function getboardColor(key) {
    return sessionStorage.getItem(key);
}

// 初始化背景顏色（如果尚未設置）
if (!getboardColor('primaryColor')) {
    setboardColor('primaryColor', "black");
}

// 設置球顏色到 sessionStorage
export function setballColor(key, color) {
    sessionStorage.setItem(key, color);
}

// 從 sessionStorage 讀取球顏色
export function getballColor(key) {
    return sessionStorage.getItem(key);
}

// 初始化球顏色（如果尚未設置）
if (!getballColor('primaryColor')) {
    setballColor('primaryColor', "white");
}

// 設置磚塊顏色到 sessionStorage
export function setblockColor(key, color) {
    sessionStorage.setItem(key, color);
}

// 從 sessionStorage 讀取磚塊顏色
export function getblockColor(key) {
    return sessionStorage.getItem(key);
}

// 初始化磚塊顏色（如果尚未設置）
if (!getblockColor('primaryColor')) {
    setblockColor('primaryColor', "skyblue");
}

// 設置玩家顏色到 sessionStorage
export function setplayerColor(key, color) {
    sessionStorage.setItem(key, color);
}

// 從 sessionStorage 讀取玩家顏色
export function getplayerColor(key) {
    return sessionStorage.getItem(key);
}

// 初始化玩家顏色（如果尚未設置）
if (!getplayerColor('primaryColor')) {
    setplayerColor('primaryColor', "lightgreen");
}

// 設置文字顏色到 sessionStorage
export function setwordColor(key, color) {
    sessionStorage.setItem(key, color);
}

// 從 sessionStorage 讀取文字顏色
export function getwordColor(key) {
    return sessionStorage.getItem(key);
}

// 初始化文字顏色（如果尚未設置）
if (!getwordColor('primaryColor')) {
    setwordColor('primaryColor', "white");
}