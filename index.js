'use strict';

let board = [0,1,2,3,4,5,6,7,8];
const okPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let maru = [];
let batsu = [];

function gameSanmoku() {
  //文字を並べてみる
  selectNum('maru', 0);
  selectNum('batsu', 4);
  selectNum('maru', 2);
  selectNum('batsu', 1);
  selectNum('maru', 8);
  selectNum('batsu', 7);
  //描画
  drawBoard();
  console.log(maru);
  console.log(batsu);
}


/**
 * role 先攻か後攻か判断
 * number 盤上の位置
 */
function selectNum(role, number) {
  let sign = 'X';
  if(role === 'maru') {
    sign = 'O';
    maru.push(board[number]);
  } else {
    sign = 'X';
    batsu.push(board[number]);
  }
  board[number] = sign;
}


/**
 * 勝ち判定
 */
function judgmentWin() {
  //どうする？
}


/**
 * 盤上を描く
 */
function drawBoard() {
  console.log("------------");
  for(let i = 0; i < board.length; i++) {
   process.stdout.write(" " + board[i] + " |");
   if( i === 2 || i === 5 || i === 8 ) {
     console.log("\n------------");
   }
  }
}

gameSanmoku();