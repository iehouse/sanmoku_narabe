'use strict';

let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const okPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const htmlboard = document.getElementById('board');
const htmlattention = document.getElementById('attention');
const btnnum = document.getElementsByClassName('js_num');

let maru = [];
let batsu = [];
let playnum = 0;
let issue = 0;

// game
for (var i = 0; i < btnnum.length; i++) {
  btnnum[i].addEventListener("click", function () {
    if (issue === 1) {
      window.alert('もう一回！');
      location.reload();
    }
    if (board[this.dataset.number] === 'O' || board[this.dataset.number] === 'X') {
      if (issue === 0) {
        window.alert('ここには書き込めません！');
      }
      return;
    }
    let player = 'maru';
    playnum++;
    // プレイヤー切り替え
    if (playnum % 2 === 0) {
      player = 'batsu';
      htmlattention.innerHTML = '<p class="bg-info text-center">〇の番です</p>';
    } else {
      player = 'maru';
      htmlattention.innerHTML = '<p class="bg-info text-center">×の番です</p>';
    }
    selectNum(player, this.dataset.number);
    drawBoard();
    if (playnum >= 5) {
      judgmentWin(maru);
      judgmentWin(batsu);
    }
    // 引き分け
    if (playnum === 9) {
      judgmentWin(maru);
      judgmentWin(batsu);
      if (issue === 0) {
        htmlattention.innerHTML = '<p class="bg-primary text-center">引き分け！</p>';
        issue = 1;
      }

    }
  }, false);
};


/**
 * 盤上にマークを書き込む
 * @param {string} role 先攻か後攻か判断
 * @param {number} number 盤上の位置
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
 * 勝ち判定をする
 * @param {Array} rolearray マークを付けた位置 
 */
function judgmentWin(rolearray) {
  let ok = 0;
  for (let i = 0; i < okPattern.length; i++) {
    // 勝利判定
    if (ok === 3) {
      let role = '〇';
      if (rolearray === batsu) {
        role = '×';
      }
      htmlattention.innerHTML = '<p class="bg-primary text-center">' + role + 'の勝ち！</p>';
      ok = 0;
      issue = 1;
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
 * 盤上を描画する
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