import './style.css';

const cells = document.querySelectorAll<HTMLDivElement>('.cell');
const result = document.querySelector<HTMLSpanElement>('.result');
const reset = document.querySelector<HTMLButtonElement>('.reset');

type Player = "1" | "2";
let currentPlayer: Player = "1";
let board: Player[] = Array(9).fill(null);

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],     
  [0, 3, 6], [1, 4, 7], [2, 5, 8],     
  [0, 4, 8], [2, 4, 6]                 
];

cells.forEach((cell, idx) => {
  cell.dataset.index = idx.toString();
  cell.addEventListener('click', () => makeMove(idx));
});

reset?.addEventListener('click', resetGame);

function makeMove(idx: number) {
  if (board[idx]) return;

  board[idx] = currentPlayer;
  cells[idx].classList.add(`player${currentPlayer}`);
  cells[idx].innerHTML = currentPlayer;

  if (checkWinner(currentPlayer)) {
    result!.innerText = `Player-${currentPlayer} Won`;
    cells.forEach(cell => cell.style.pointerEvents = "none");
    return;
  }

  if (board.every(cell => cell !== null)) {
    result!.innerText = "Match Draw";
    return;
  }
  currentPlayer = currentPlayer === "1" ? "2" : "1";
}

function checkWinner(player: Player): boolean {
  return winPatterns.some(pattern =>
    pattern.every(idx => board[idx] === player)
  );
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "1";
  cells.forEach(cell => {
    cell.classList.remove('player1', 'player2');
    cell.innerHTML = "";
    cell.style.pointerEvents = "auto";
  });
  if (result) result.innerText = "";
}
