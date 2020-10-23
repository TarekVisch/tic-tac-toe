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

    board[squareIndex] = 'x'; // change this to player mark

    render();
  }

  return { render };
})();

const GameModule = (function () {
  function _init() {
    BoardModule.render();
  }

  _init();
})();
