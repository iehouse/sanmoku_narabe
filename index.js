'use strict';

let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const okPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let maru = [];
let batsu = [];

const htmlboard = document.getElementById('board');
const btnnum = document.getElementsByClassName('js_num');

let playnum = 0;

// game
for (var i = 0; i < btnnum.length; i++) {
  btnnum[i].addEventListener("click", function () {

    let player = 'maru';
    playnum++;

    // プレイヤー切り替え
    if (playnum % 2 === 0) {
      player = 'batsu';
    } else {
      player = 'maru';
    }

    selectNum(player, this.dataset.number);

    drawBoard();

    if (maru.length >= 3) {
      judgmentWin(maru);
      judgmentWin(batsu);
    }

    // 引き分け
    if (playnum === 9) {
      console.log("引き分け！");
    }

  }, false);
};

//TODO 連続で同じ個所を押された時の処理



/**
 * role 先攻か後攻か判断
 * number 盤上の位置
 */
function selectNum(role, number) {
  let sign = 'X';
  if (role === 'maru') {
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
 * role 
 */
function judgmentWin(rolearray) {
  let ok = 0;
  for (let i = 0; i < okPattern.length; i++) {

    // 勝利判定
    if (ok === 3) {
      let role = 'maru';
      if (rolearray === batsu) {
        role = 'batsu';
      }
      console.log("winner→ " + role);
      ok = 0;
      break;
    } else {
      ok = 0;
    }

    // パターン照合
    for (let j = 0; j < okPattern[i].length; j++) {
      if (rolearray.indexOf(okPattern[i][j]) >= 0) {
        ok++;
      }
    }
  }
}


/**
 * 盤上を描く
 */
function drawBoard() {
  for (let i = 0; i < board.length; i++) {
    let div = document.getElementById(i);
    if (board[i] === 'O' || board[i] === 'X') {
      div.innerHTML = board[i];
    } else {
      div.innerHTML = " ";
    }
  }
}