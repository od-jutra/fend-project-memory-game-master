// card list to shuffle 

let card = document.querySelectorAll('.card');
let cans = ['can4', 'can2', 'can3', 'can1', 'can5', 'can6', 'can7', 'can8', 'can1', 'can2', 'can3', 'can4', 'can5', 'can6', 'can7', 'can8'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function start(){
    shuffle(cans),
    cardMatch()
}
start();

function cardMatch(){
    for(i = 0; i<16; i++){
        card[i].classList.add(cans[i])
    }
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
console.log(cans);

//  adding html to the page
for( var i=0; i<16; i++){
    let place = card[i].lastElementChild;
    place.innerHTML= '<img src="img/' + cans[i] +'.png" alt="can3">';
}

//  timer
var sec;
let timeOn = false;

for (var i = 0; i < 16; i++){
    card[i].addEventListener('click',
        function count(){
            if(!(timeOn)){
            sec = 0;
            setInterval(function(){sec++}, 1000);
            const timer = document.getElementById('timer');
            setInterval( function(){
            timer.innerHTML = sec + " seconds";}, 1000)
            timeOn = true;
        }
    })
};
//flip card   idea how to flip from https://jsfiddle.net/james2doyle/qsQun/

var visible = false;
let visibleCards = [];
for (var i = 0; i < 16; i++){
    card[i].addEventListener('click', function flip(){
        if(this.classList.contains('open')){
            alert('choose other card!')
        }
        else{
            this.classList.add('open');
            visible = true;
            visibleCards.push(this);
            checkCards();
            countMoves()
        }
    })
};

// count moves
let move = 0;
function countMoves(a){
    let movesNum = document.querySelector('.moves');
    move++;
    movesNum.innerHTML = move + ' moves'
}
// to check if two cards match
let matchedCards = [];
function checkCards(){
    if(visibleCards.length == 2){
        if(visibleCards[0].classList[1] == visibleCards[1].classList[1]){
           for(i=0; i<2; i++){
            visibleCards[i].classList.add('match');
            matchedCards.push(visibleCards[i])}
            visibleCards.length = 0;   /* method 2 form https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript */
            ifMatched();
        }
        else{
            hideCard(visibleCards[0]);
            hideCard(visibleCards[1]);
            visibleCards.length = 0
        }
    };
};

// hide a card 

function hideCard(i){
    setTimeout(function(){i.classList.remove('open')}, 1000)
};
// check the number of matched cards

function ifMatched(){
        console.log('cards matched!');
        whenFinish()
};
    
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


//  reload
let reloadButton = document.querySelector('.restart');
reloadButton.addEventListener('click', function(){
    window.location.reload(true);  
});
// mdn- reload  https://developer.mozilla.org/en-US/docs/Web/API/Location/reload

const modal = document.querySelector('.modal');
const playAgain = document.querySelector('.playAgain');
const close = document.getElementsByClassName("close")[0];

function whenFinish(){
    if(matchedCards.length == 16){
        console.log('you won! in ' + sec + ' seconds and ' + move + ' moves');
        setTimeout(function(){
        modal.style.display = "block";
        let scoresMessage = document.querySelector('.scores');
        scoresMessage.innerHTML = 'You did it in '+ sec + ' seconds \n and ' + move + ' moves';
        },1500)
    }
};

playAgain.onclick = function(){
    window.location.reload(true); 
};

close.onclick = function(){
    modal.style.display = "none";
};

window.onclick = function(event){
    if (event.target == modal) {
        modal.style.display = "none";
    }
}