const BoardModule = (function (players) {
  // State
  const board = ['', '', '', '', '', '', '', '', ''];

  // DOM Cache
  const boardDOM = document.querySelector('.board');
  const _squares = Array.from(document.querySelectorAll('.board__square'));

  function render() {
    for (let i = 0; i < board.length; i++) {
      _squares[i].textContent = board[i];
    }
  }

  function equalMarks(x, y, z) {
    return x === y && y === z && x !== '';
  }

  function checkWinner() {
    let winner = null;

    // Left to Right Diagonal
    if (equalMarks(board[0], board[4], board[8])) {
      winner = board[0];
    }

    // Right to Left Diagonal
    if (equalMarks(board[2], board[4], board[6])) {
      winner = board[2];
    }

    // Verticals
    if (equalMarks(board[0], board[1], board[2])) winner = board[0];
    if (equalMarks(board[3], board[4], board[5])) winner = board[3];
    if (equalMarks(board[6], board[7], board[8])) winner = board[6];

    // Horizontal
    if (equalMarks(board[0], board[3], board[6])) winner = board[0];
    if (equalMarks(board[1], board[4], board[7])) winner = board[3];
    if (equalMarks(board[2], board[5], board[8])) winner = board[6];

    return winner;
  }

  return { board, boardDOM, render, checkWinner };
})();

const playerFactory = (mark, name, score) => {
  // Dom Cache
  const playerDOM = document.querySelector(`.player${mark}`);
  const detailsDOM = playerDOM.querySelector('.dashboard__player--details');
  const scoreDOM = playerDOM.querySelector('.dashboard__player--details-score');
  const winnerDOM = playerDOM.querySelector('.dashboard__player--winner');
  const tieDOM = document.querySelector('.dashboard__tie');

  // Getters and Setters
  const getMark = () => mark;
  const getName = () => name;
  const getScore = () => score;
  const setScore = (newScore) => (score = newScore);

  const takeTurn = (isTurn = true) => {
    if (isTurn) {
      detailsDOM.classList.add('turn');
    } else {
      detailsDOM.classList.remove('turn');
    }
  };

  const winner = (isWinner = true) => {
    if (isWinner) {
      setScore(getScore() + 1);
      detailsDOM.classList.remove('turn');
      detailsDOM.classList.add('winner');
      winnerDOM.style.opacity = 1;
    } else {
      detailsDOM.classList.remove('winner');
      winnerDOM.style.opacity = 0;
    }
  };

  const displayScore = () => {
    scoreDOM.textContent = getScore();
  };

  return {
    getMark,
    getName,
    getScore,
    setScore,
    takeTurn,
    winner,
    tieDOM,
    displayScore,
  };
};

const GameModule = (function () {
  let stopGame = false;

  const player1 = playerFactory('x', 'Player 1', 0);
  const player2 = playerFactory('o', 'Player 2', 0);
  const players = [player1, player2];

  let _current = 0;

  // DOM Cache
  const { boardDOM } = BoardModule;
  const resetButton = document.querySelector('.reset');
  const nextRoundButton = document.querySelector('.next-round');

  const { board, render, checkWinner } = BoardModule;

  // Events Handling
  boardDOM.addEventListener('click', _handleClick);
  resetButton.addEventListener('click', reset);
  nextRoundButton.addEventListener('click', nextRound);

  function _init() {
    render();
    player1.takeTurn();
  }
  _init();

  function _handleClick(e) {
    if (stopGame) {
      return;
    }

    const { target } = e;

    if (!target.matches('.board__square')) {
      return;
    }

    if (target.textContent != '') {
      return;
    }

    // Get index of clicked square
    const squareIndex = target.dataset.index;

    // update board
    board[squareIndex] = players[_current].getMark();
    render();

    const isBoardFull = board.every((mark) => mark != '');

    // Check Winner
    if (checkWinner()) {
      players[_current].winner();
      stopGame = true;
      return;
    } else if (checkWinner() == null && isBoardFull) {
      players[_current].tieDOM.style.opacity = 1;
      stopGame = true;
    }

    _playerNext();
  }

  function _playerNext() {
    players[_current].takeTurn(false);
    _current = _current === 0 ? 1 : 0;
    players[_current].takeTurn();
  }

  function nextRound() {
    stopGame = false;

    players[_current].displayScore();
    players[_current].winner(false);
    players[_current].tieDOM.style.opacity = 0;
    _playerNext();

    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }

    render();
  }

  function reset() {
    for (let i = 0; i < players.length; i++) {
      players[i].setScore(0);
      players[i].displayScore();
    }
    nextRound();
  }

  return { reset };
})();
