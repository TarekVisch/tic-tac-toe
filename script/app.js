const BoardModule = (function () {
  // State
  const board = ['', '', '', '', '', '', '', '', ''];

  // DOM Cache
  const boardDOM = document.querySelector('.board');
  const squares = Array.from(document.querySelectorAll('.board__square'));

  // Events Handling
  boardDOM.addEventListener('click', handleClick);

  function render() {
    for (let i = 0; i < board.length; i++) {
      squares[i].textContent = board[i];
    }
  }

  function handleClick(e) {
    const { target } = e;

    if (!target.matches('.board__square')) {
      return;
    }

    // If a board square is not empty retutn
    if (target.textContent != '') {
      return;
    }

    // Get index of square
    const squareIndex = target.dataset.index;
    // Update board array
    board[squareIndex] = 'x'; // change this to player mark

    render();

    checkWinner();
  }

  function checkWinner() {
    let winner = null;

    return winner;
  }

  return { render };
})();

const playerFactory = (mark, name, score) => {
  // Dom Cache
  const playerDOM = document.querySelector(`.player${mark}`);
  const details = playerDOM.querySelector('.dashboard__player--details');
  const winnerDOM = playerDOM.querySelector('.dashboard__player--winner');

  // Getters and Setters
  const getMark = () => mark;
  const getName = () => name;
  const getScore = () => score;
  const setScore = (newScore) => (score = newScore);

  const takeTurn = (isTurn = true) => {
    if (isTurn) {
      details.classList.add('turn');
    } else {
      details.classList.remove('turn');
    }
  };

  const winner = (isWinner = true) => {
    if (isWinner) {
      details.classList.remove('turn');
      details.classList.add('winner');
      winnerDOM.style.opacity = 1;
    } else {
      details.classList.remove('winner');
      winnerDOM.style.opacity = 0;
    }
  };

  return { getMark, getName, getScore, setScore, takeTurn, winner };
};

const GameModule = (function () {
  const player1 = playerFactory('x', 'Player 1', 0);
  const player2 = playerFactory('o', 'Player 2', 0);
  const players = [player1, player2];
  let currentPlayer = 0;

  function _init() {
    BoardModule.render();
    players[currentPlayer].takeTurn();
  }

  _init();
})();
