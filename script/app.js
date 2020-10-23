const BoardModule = (function () {
  const board = ['x', '', 'o', 'o', 'x', 'x', '', '', 'o'];

  const squares = Array.from(document.querySelectorAll('.board__square'));

  function render() {
    for (let i = 0; i < board.length; i++) {
      squares[i].textContent = board[i];
    }
  }

  return { render };
})();

const GameModule = (function () {
  function _init() {
    BoardModule.render();
  }

  _init();
})();
