'use strict';

let board, maruBoardIndexes, batsuBoardIndexes, playNum, issue;
const okPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const htmlAttention = document.getElementById('attention');
const btnNum = document.getElementsByClassName('js_num');


window.addEventListener('load', init);

for (var i = 0; i < btnNum.length; i++) {
  btnNum[i].addEventListener("click", handleBtnNumClick);
};


/**
 * 初期化
 */
function init() {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  maruBoardIndexes = [];
  batsuBoardIndexes = [];
  playNum = 0;
  issue = 0;
}

/**
 * ゲームの実行
 */
function handleBtnNumClick() {
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
  let isMaru = true;
  playNum++;
  // プレイヤー切り替え
  if (playNum % 2 === 0) {
    isMaru = false;
    htmlAttention.innerHTML = '<p class="bg-info text-center">〇の番です</p>';
  } else {
    isMaru = true;
    htmlAttention.innerHTML = '<p class="bg-info text-center">×の番です</p>';
  }
  selectNum(isMaru, this.dataset.number);
  drawBoard();
  if (playNum >= 5) {
    judgmentWin(maruBoardIndexes);
    judgmentWin(batsuBoardIndexes);
  }
  // 引き分け
  if (playNum === 9) {
    judgmentWin(maruBoardIndexes);
    judgmentWin(batsuBoardIndexes);
    if (issue === 0) {
      htmlAttention.innerHTML = '<p class="bg-primary text-center">引き分け！</p>';
      issue = 1;
    }

  }
}


/**
 * 盤上にマークを書き込む
 * @param {string} role 先攻か後攻か判断
 * @param {number} boardIndex 盤上の位置
 */
function selectNum(role, boardIndex) {

  let sign = 'X';
  if (role) {
    sign = 'O';
    maruBoardIndexes.push(board[boardIndex]);
  } else {
    sign = 'X';
    batsuBoardIndexes.push(board[boardIndex]);
  }
  board[boardIndex] = sign;
}


/**
 * 勝ち判定をする
 * @param {Array} roleArray マークを付けた位置 
 */
function judgmentWin(roleArray) {
  let ok = 0;
  for (let i = 0; i < okPattern.length; i++) {
    // 勝利判定
    if (ok === 3) {
      let role = '〇';
      if (roleArray === batsuBoardIndexes) {
        role = '×';
      }
      htmlAttention.innerHTML = '<p class="bg-primary text-center">' + role + 'の勝ち！</p>';
      ok = 0;
      issue = 1;
      break;
    } else {
      ok = 0;
    }

    // パターン照合
    for (let j = 0; j < okPattern[i].length; j++) {
      if (roleArray.indexOf(okPattern[i][j]) >= 0) {
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


