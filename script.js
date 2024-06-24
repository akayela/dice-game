'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Declaring global variables
let activePlayer, currentScore, playing, scores;

//Starting conditions
const init = function () {
  // Set each player's global score back to 0
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Set each player's current score back to 0
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Remove winner class from both players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Set the white background back on player 1 aka 0
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Setting play to true
  playing = true;

  // Current player must be player 1 aka 0
  activePlayer = 0;

  // Set game score values for each player back to 0
  scores = [0, 0];

  // Hide the dice
  diceEl.classList.add('hidden');

  // Set the dice value to 0
  currentScore = 0;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // display the score
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Holding the score and finishing the game
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if players score is >= 100
    // If >= 100 finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener('click', init);
