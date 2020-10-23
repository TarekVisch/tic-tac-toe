const BoardModule = (function (players) {
  // State
  const board = ['', '', '', '', '', '', '', '', ''];

  // DOM Cache
  const boardDOM = document.querySelector('.board');
  const squares = Array.from(document.querySelectorAll('.board__square'));

  function render() {
    for (let i = 0; i < board.length; i++) {
      squares[i].textContent = board[i];
    }
  }

  function checkWinner() {
    let winner = null;

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

    checkWinner();

    _playerNext();
  }

  function _playerNext() {
    players[_current].takeTurn(false);
    _current = _current === 0 ? 1 : 0;
    players[_current].takeTurn();
  }

  function nextRound() {
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
