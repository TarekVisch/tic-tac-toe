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
  const getMark = () => mark;
  const getName = () => name;
  const getScore = () => score;
  const setScore = (newScore) => (score = newScore);

  return { getMark, getName, getScore, setScore };
};

const GameModule = (function () {
  const player1 = playerFactory('x', 'Player 1', 0);
  const player2 = playerFactory('o', 'Player 2', 0);
  const players = [player1, player2];
  let currentPlayer = 0;

  function _init() {
    BoardModule.render();
  }

  _init();
})();
