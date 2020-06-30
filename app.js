/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- This is to play
*/
var scores, roundScore, activePlayer, gamePlaying, lastDice, dice, signal, winScore, dice1;
init();
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        if (signal === undefined || signal == false) {
            lastDice = dice;
        } else {
            lastDice = 0;
            signal = false;
            roundScore = 0;
        }
        // 1. Random number
        winScore = document.getElementById("winScore").value;
        if (winScore !== '') {
            dice = Math.floor(Math.random() * 6) + 1;
            dice1 = Math.floor(Math.random() * 6) + 1;
            //2. Display the result
            var diceDOM = document.querySelector('.dice');
            var dice1DOM = document.querySelector('.dice1');
            diceDOM.style.display = 'block';
            dice1DOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';
            dice1DOM.src = 'dice-' + dice1 + '.png';
            //3. Update the round score IF the rolled number was NOT a 1
            if (dice !== 1 && dice1 !== 1 &&(dice !== 6 || lastDice !== 6)) {
                //Add score
                roundScore += dice;
                roundScore += dice1;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else if (dice === 1 || dice1 === 1){
                //Next player
                document.getElementById('current-' + activePlayer).textContent = 0;
                roundScore = 0;
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.dice1').style.display = 'none';
            } else {
                document.getElementById('current-' + activePlayer).textContent = 0;
                scores[activePlayer] = 0;
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                document.getElementById('score-' + activePlayer).textContent = 0;
                activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.dice1').style.display = 'none';
                signal = true;
            }
        } else {
            alert("Please enter a winning score.");
        }
    }
});
document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    if (scores[activePlayer] >= winScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
        roundScore = 0;
    } else if (gamePlaying){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        roundScore = 0;
        signal = true;
    }
});
document.querySelector('.btn-new').addEventListener('click', init);
function init() {
    lastDice = 0;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}