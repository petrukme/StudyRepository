var gameController = function() {
  'use strict';
  var ballTypes = ['color-white', 'color-pink', 'color-yellow',
                   'color-green', 'color-red', 'color-blue'],
      combination = [0, 0, 0, 0], 
      currentCombination = [],
      selectedBallColor = ballTypes[0],
      turnNumber = 1, // number from 1 to 8
      currentTurn = getTurn(turnNumber);
  
  generateSequence();
  addOkButton();

  function generateSequence() {
      var i;
      for(i = 0; i < combination.length; i++) {
        combination[i] = getRandomInt(0, ballTypes.length);
      }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    currentCombination = [];
    removeOkButton();
    currentTurn = getTurn(++turnNumber);
    addOkButton();
  }

  function compareCombinations(a, b) {
    var res = {color: 0, colorAndPosition: 0}, 
        visitedIndexes = [-1, -1, -1, -1],
        i, 
        index;

    for(i = 0; i < a.length; i++) {
      index = b.indexOf(a[i], visitedIndexes[a[i]]+1);
      if(~index) {
        visitedIndexes[a[i]] = visitedIndexes[a[i]] < index ? index : visitedIndexes[a[i]];
        if(i === index) {
          res.colorAndPosition++;
          continue;
        }
        res.color++;
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
      if(!isCurrentCumbinationFull()) {
        return;
      }
      res = compareCombinations(currentCombination, combination);
      if(res.colorAndPosition === combination.length) {
        victory();
        return;
      }
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

  function displayResults() {
    
  }

  function victory() {
    alert("Victory!");
  }
  
  return {
    ballSpotOnClick: function(elem) {
      var classes = elem.className.split(' ');
      if(elem.parentNode.parentNode !== currentTurn) {
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