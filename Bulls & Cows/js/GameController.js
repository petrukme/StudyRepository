var gameController = function() {
  'use strict';
  var ballTypes = ['color-white', 'color-pink', 'color-yellow',
                   'color-green', 'color-red', 'color-blue'],
      combination = [0, 0, 0, 0],
      currentCombination = [],
      selectedBallColor = ballTypes[0],
      turnNumber = 1, // number from 1 to 8
      currentTurnDiv = getDivTurn(turnNumber);
  
  function getDivTurn(n) {
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
    removeEventListenersForCurrentTurn();
    currentTurnDiv = getDivTurn(++turnNumber);
    addEventListenersForCurrentTurn();
  }
  
  function compareCombinations() {
    var i,
        res = {color: 0,
              colorAndPosition: 0};

    for(i = 0; i < combination.length; i++) {
      if(currentCombination[i] !== combination[i]) {
        res.colorAndPosition++;
      }
    }
    return res;
  }
  
  function addClasses(elem, classes){
    
  }
    
  function selectBall(elem) {
    
  }
  
  return {
    okButtonOnClick: function() {
      if(currentCombination.length !== combination.length) {
        return;
      }
      if(compareCombinations()) {
        nextTurn();
      }
    },
    
    ballSpotOnClick: function(elem) {
      var classes = elem.className.split(' ');
      if(elem.parentNode.parentNode !== currentTurnDiv) {
        return;
      }
      classes[1] = 'ball';
      classes[2] = selectedBallColor;
      elem.className = classes.join(' ');
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