'use strict';

//Variables Declaration
let elementScore0_AfterHoldingTheirTurn = document.querySelector('#score--0');
let elementScore1_AfterHoldingTheirTurn = document.querySelector('#score--1');
let elementScore0_AfterThrowingDice = document.querySelector('#current--0');
let elementScore1_AfterThrowingDice = document.querySelector('#current--1');

let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

let currentScore = 0;

let scores = [0, 0];

//To stop the playing when either player reaches 100 points
let playing = true;

//Buttons
const newButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

const imageSrc = document.querySelector('.dice');

//Function Declarations

//Switching the player when hold button is clicked
function switchPlayer(player1, player2) {
  let whichPlayerIsPlaying;

  if (player1.classList.contains('player--active')) whichPlayerIsPlaying = 0;
  else if (player2.classList.contains('player--active'))
    whichPlayerIsPlaying = 1;

  //To change the player, when player 1 is playing switching to player 2 and vice versa
  if (whichPlayerIsPlaying === 0) {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else if (whichPlayerIsPlaying === 1) {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
}

//To check which player is playing
function playerPlaying(player1, player2) {
  if (player1.classList.contains('player--active')) return 0;
  else if (player2.classList.contains('player--active')) return 1;
}



//When game starts, the content to be displayed
elementScore0_AfterHoldingTheirTurn.textContent = 0;
elementScore1_AfterHoldingTheirTurn.textContent = 0;
elementScore0_AfterThrowingDice.textContent = 0;
elementScore1_AfterThrowingDice.textContent = 0;

//When the roll dice button is clicked
rollDiceButton.addEventListener('click', function () {
  if (playing) {
    let randomDice = Math.trunc(Math.random() * 6) + 1; //Generating random number between 1 and 6
    imageSrc.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentScore += randomDice;
      if (playerPlaying(player1, player2) === 0) {
        elementScore0_AfterThrowingDice.textContent = currentScore;
      } else if (playerPlaying(player1, player2) === 1) {
        elementScore1_AfterThrowingDice.textContent = currentScore;
      }
    } else {
      switchPlayer(player1, player2);
      currentScore = 0;
      elementScore0_AfterThrowingDice.textContent = 0;
      elementScore1_AfterThrowingDice.textContent = 0;
    }
  }
});

//when the hold button is clicked
holdButton.addEventListener('click', function () {
  if (playing) {
    if (playerPlaying(player1, player2) === 0) {
      scores[0] += Number(elementScore0_AfterThrowingDice.textContent);
      elementScore0_AfterHoldingTheirTurn.textContent = scores[0];
      elementScore0_AfterThrowingDice.textContent = '0';
    } else if (playerPlaying(player1, player2) === 1) {
      scores[1] += Number(elementScore1_AfterThrowingDice.textContent);
      elementScore1_AfterHoldingTheirTurn.textContent = scores[1];
      elementScore1_AfterThrowingDice.textContent = '0';
    }
    switchPlayer(player1, player2);
    currentScore = 0;

    if (Number(elementScore0_AfterHoldingTheirTurn.textContent) >= 100) {
      player1.classList.add('player--winner');
      playing = false;
      switchPlayer(player1, player2);
    } else if (Number(elementScore1_AfterHoldingTheirTurn.textContent) >= 100) {
      player2.classList.add('player--winner');
      playing = false;
      switchPlayer(player1, player2);
    }
  }
});

//When New button is clicked
newButton.addEventListener('click', function () {
  if (scores[0] >= 100) {
    player1.classList.remove('player--winner');
    playing = true;

    switchPlayer(player1, player2);
  } else if (scores[1] >= 100) {
    player2.classList.remove('player--winner');
    playing = true;

    switchPlayer(player1, player2);
  }
  imageSrc.src = 'starting-image.jpg';
  scores[0] = 0;
  scores[1] = 0;
  elementScore0_AfterHoldingTheirTurn.textContent = 0;
  elementScore1_AfterHoldingTheirTurn.textContent = 0;
  elementScore0_AfterThrowingDice.textContent = 0;
  elementScore1_AfterThrowingDice.textContent = 0;
  currentScore = 0;
});
