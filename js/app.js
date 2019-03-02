/*
 * Create a list that holds all of your cards

 <li class="card">
     <i class="fa fa-paper-plane-o"></i>
 </li>
 */
 cards = ['fa-diamond', 'fa-diamond',
          'fa-paper-plane-o', 'fa-paper-plane-o',
          'fa-anchor', 'fa-anchor',
          'fa-bolt', 'fa-bolt',
          'fa-cube', 'fa-cube',
          'fa-leaf', 'fa-leaf',
          'fa-bicycle', 'fa-bicycle',
          'fa-bomb', 'fa-bomb'];

openCards = [];
matchedCards = [];
timecalculator = 0;
let timeInterval = setInterval(function(){updateTimer()}, 1000);

function generateCardHTML() {
  cards = shuffle(cards);
  let cardHTML = '';
  for (const card of cards) {
     cardHTML += `<li class="card" data-card="${card}"> <i class="fa ${card}"></i></li>`;
  }
  return cardHTML;
}

function updateStarColor() {
  const stars = document.querySelectorAll('.star');
  for (const star of stars) {
    if (star.getAttribute("data-color") == "white") {
      star.setAttribute("data-color", "black");
      star.style.color = 'black';
    }
  }
}

function beginGames() {
  matchedCards = [];
  updateStarColor();
  const deck = document.querySelector('.deck');
  deck.innerHTML = generateCardHTML(cards);
  const moveElement = document.querySelector('.moves');
  moveElement.innerText = 0;
  const timer = document.querySelector('.timer');
  timecalculator = 0;
  timer.innerText = "00:00";
  timecalculator = 0;
}

function updateNumMovement() {
  const moveElement = document.querySelector('.moves');
  let numMovement = parseInt(moveElement.innerText) + 1;
  moveElement.innerText = numMovement+"";
  return numMovement;
}

function updateTimer() {
      const timer = document.querySelector('.timer');
      timecalculator = timecalculator + 1;

      let sec = timecalculator%60;
      let min = (timecalculator-sec)/60;
      let minString = "";
      let secString = "";

      if (min < 10) {
          minString = "0"+min;
      }
      else {
          minString = ""+min;
      }
      if (sec < 10) {
          secString = "0"+sec;
      }
      else {
          secString = ""+sec;
      }

      timer.innerText = minString + ":" + secString;
      return timer.innerText;
}

function reduceNumOfStar() {

      const stars = document.querySelectorAll('.star');
      for (const star of stars) {
        if (star.getAttribute("data-color") == "black") {
          star.setAttribute("data-color", "white");
          star.style.color = 'white';
          return;
        }
      }
}

function getNumStars(){
  const stars = document.querySelectorAll('.star');
  let count = 0;
  for (const star of stars) {
    if (star.getAttribute("data-color") == "black") {
      count++;
    }
  }
  return count;
}

function displayModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = "flex";
}


beginGames();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const container = document.querySelector('.container');

//click playagain to reload the game
const button = document.querySelector('.button');
button.addEventListener('click', function() {
  const modal = document.querySelector('.modal');
  modal.style.display = "none";
  beginGames();
});

container.addEventListener('click', function(event) {
    // if there is alredy more than 2 cards open,
    // then user should not be able to open the third card
    if (openCards.length>=2)
      return;


    const card = event.target;
    if (card.classList[0] == 'card' && !card.classList.contains('show') && !card.classList.contains('open')) {
      const numMovement = updateNumMovement();

      // when number of movement is larger than 30, star reduced to 2, when its larger than 50, it reduces to 1;
      if (numMovement == 30) {
        reduceNumOfStar();
      }
      if (numMovement == 50) {
        reduceNumOfStar();
      }
      card.classList.add('open', 'show');
      openCards.push(card);
    }


    if (openCards.length == 2) {
      //check if two cards match
      if (openCards[0].getAttribute("data-card") == openCards[1].getAttribute("data-card")) {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        matchedCards.push(openCards[0]);
        matchedCards.push(openCards[1]);
        console.log(matchedCards.length);
        if (matchedCards.length == 16) {
          const timerElement = document.querySelector('.timer');
          const moveElement = document.querySelector('.moves');


          const moveOutputElement = document.querySelector('.movesResult');
          const timeOutputElement = document.querySelector('.timeResult');
          const starResultElement = document.querySelector('.starResult');

          starResultElement.innerText = getNumStars();
          moveOutputElement.innerText = moveElement.innerText;
          timeOutputElement.innerText = timerElement.innerText;
          displayModal();

        }
        openCards = [];
      }
      else {
        setTimeout(function() {
            openCards[0].classList.remove('open','show');
            openCards[1].classList.remove('open','show');
            openCards = [];
        }, 1000);
      }
    }

});


//restarts the Game
const repeatGame = document.querySelector('.fa-repeat');
repeatGame.addEventListener('click', function() {
    beginGames();
})


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
