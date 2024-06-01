'use strict';
//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//set scores to 0 initially
score0El.textContent = 0;
score1El.textContent = 0;
//select dice element and hide the dice first
const diceEl = document.querySelector('.dice');
//diceEl.classList.add('hidden');
//Roll Dice functionality
let scores, currentScore, activePlayer, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //console.log(playing);
};
init();
//const scores = [0, 0];
//let currentScore = 0;
//let activePlayer = 0;
//let playing = true;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//Hold button functionality
btnHold.addEventListener('click', function () {
  // 1. add current score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
  }
  // display score to the active player's score
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if player's score >= 20
  if (scores[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
  } else {
    //switch player
    switchPlayer();
  }
});

// 3. New game button functionality - reset the game
btnNew.addEventListener('click', function () {
  init();
});
