var gameController = function() {
  'use strict';
  var ballTypes = ['color-white', 'color-pink', 'color-yellow',
                   'color-green', 'color-red', 'color-blue'],
      combination = [0, 0, 0, 0], 
      currentCombination = [],
      selectedBallColor = ballTypes[0],
      turnNumber = 1,
      currentTurn = getTurn(turnNumber),
      gameOver = false;
  
  generateCombination();
  addOkButton();

  function generateCombination() {
      var i;
      for(i = 0; i < combination.length; i++) {
        combination[i] = getRandomInt(0, ballTypes.length);
      }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getTurn(n) {
    var turnsNumbers = document.getElementsByClassName('turn-number'),
        i;
    for(i = 0; i < turnsNumbers.length; i++) {
      if(+turnsNumbers[i].innerText === n) {
        return turnsNumbers[i].parentNode;
      }
    }
  }
  
  function nextTurn() {
    if(turnNumber === 8) {
      defeat();
      return;
    }
    currentCombination = [];
    removeOkButton();
    currentTurn = getTurn(++turnNumber);
    addOkButton();
  }

  function compareCombinations(a, b) {
    var res = {color: 0, colorAndPosition: 0};

    res.colorAndPosition = a.reduce(function(res, elem, index){
       return elem === b[index] ? ++res : res;
    }, 0);
    res.color = gotSameColor(a.slice(), b);
    
    return res;
  }

  function gotSameColor(a, b) {
    var res = 0,
        index,
        i;
    for(i = 0; i < b.length; i++) {
      index = a.indexOf(b[i]);
      if(~index) {
        res++;
        a[index] = undefined;
      } 
    }
    return res;
  }

  function isCurrentCumbinationFull() {
    var i;
    for(i = 0; i < combination.length; i++) {
      if(currentCombination[i] === undefined) {
        return false;
      }
    }
    return true;
  }

 function okButtonOnClick() {
      var res;
      if(gameOver) {
        reset();
        return;
      }
      if(!isCurrentCumbinationFull()) {
        return;
      }
      res = compareCombinations(currentCombination, combination);
      if(res.colorAndPosition === combination.length) {
        victory();
        return;
      }
      displayResults(res);
      nextTurn();
    }

  function addOkButton() {
    var okButtonDiv = currentTurn.getElementsByClassName('infobox')[0];
    okButtonDiv.className += ' ok-button';
    okButtonDiv.addEventListener('click', okButtonOnClick);
    
  }

  function removeOkButton() {
    var okButtonDiv = currentTurn.getElementsByClassName('ok-button')[0];
    okButtonDiv.className = 'infobox';
    okButtonDiv.removeEventListener('click', okButtonOnClick);
  }

  function displayResults(res) {
    var results = currentTurn.getElementsByClassName('result-spot'), 
        i;
    for(i = 0; i < res.color; i++) {
      if(i < res.colorAndPosition)
        results[i].className += ' result bull';
      else
        results[i].className += ' result cow';
    }
  }

  function defeat() {
    alert('You lost!');
    gameOver = true;
  }

  function victory() {
    alert("Victory!");
    gameOver = true;
  }

  function reset() {
    var elementsToClear = document.querySelectorAll('div.line div.ball-spot'),
        i;
    for(i = 0; i < elementsToClear.length; i++) {
      elementsToClear[i].className = 'ball-spot';
    }
    elementsToClear = document.getElementsByClassName('result-spot');
     for(i = 0; i < elementsToClear.length; i++) {
      elementsToClear[i].className = 'result-spot';
    }
    gameOver = false;
    currentCombination = [];
    generateCombination();
    turnNumber = 0;
    nextTurn();
  }
  
  return {
    ballSpotOnClick: function(elem) {
      var classes = elem.className.split(' ');
      if(gameOver || elem.parentNode.parentNode !== currentTurn) {
        return;
      }
      classes[1] = 'ball';
      classes[2] = selectedBallColor;
      elem.className = classes.join(' ');
      currentCombination[+elem.innerText] = ballTypes.indexOf(selectedBallColor);
    },
    
    ballSelectOnClick: function(elem) {
      var classes = elem.className.split(' '),
          perviousSelectedColor;
      if(classes[3] === 'active-ball') {
        return;
      }
      else {
        if(selectedBallColor) {
          perviousSelectedColor = document.querySelector('.balls-avaliable .' + selectedBallColor);
          perviousSelectedColor.className = 'ball-spot ball ' + selectedBallColor;
        }
        selectedBallColor = classes[2];
        elem.className += ' active-ball';
      }
    }
  };
}();