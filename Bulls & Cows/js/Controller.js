function Controller (model) {
  this.ballTypes = ['color-white', 'color-pink', 'color-yellow',
                   'color-green', 'color-red', 'color-blue'];
  this._selectedBallColor = 'color-white';
  this._currentTurn = this.getTurn(model.turnNumber);
  this._model = model;

  this.addOkButton();
  this.setBallSpotListeners();
  this.setAvaliableBallsListeners();
}
Controller.prototype.addOkButton = function() {
  var okButtonDiv = this._currentTurn.getElementsByClassName('infobox')[0],
      self = this;
  this._okButtonEventListener = Controller.prototype.okButtonOnClick.bind(this);
  okButtonDiv.className += ' ok-button';
  okButtonDiv.addEventListener('click', this._okButtonEventListener);
}

Controller.prototype.removeOkButton = function() {
  var okButtonDiv = this._currentTurn.getElementsByClassName('ok-button')[0];
  okButtonDiv.className = 'infobox';
  okButtonDiv.removeEventListener('click', this._okButtonEventListener);
}

Controller.prototype.setBallSpotListeners = function () {
  var ballSpots = document.querySelectorAll('div.line div.ball-spot'),
      self = this,
      i;
  for(i = 0; i < ballSpots.length; i++) {
    ballSpots[i].addEventListener('click', function (event) { self.ballSpotOnClick(event.currentTarget); });
  }
}

Controller.prototype.setAvaliableBallsListeners = function () {
  var ballSpots = document.querySelectorAll('div.balls-avaliable div.ball-spot'),
      self = this,
      i;
  for(i = 0; i < ballSpots.length; i++) {
    ballSpots[i].addEventListener('click', function (event) { self.changeSelectedBall(event.currentTarget); });
  }
}

Controller.prototype.okButtonOnClick = function () {
  var res;
  if(this._model.isGameOver || !this._model.isCombinationReady()) {
    return;
  }
  res = this._model.compareCombinations();
  if(res.bulls === 4) {
    this._model.gameOver('Victory!');
    return;
  }
  this.displayResults(res);
  this.removeOkButton();
  this._model.nextTurn();
  this._currentTurn = this.getTurn(this._model.turnNumber);
  this.addOkButton();
};

Controller.prototype.ballSpotOnClick = function (elem) {
  var classes = elem.className.split(' ');
  if(this._model.isGameOver || parseInt(elem.parentNode.parentNode.innerText) !== this._model.turnNumber) {
    return;
  }
  classes[1] = 'ball';
  classes[2] = this._selectedBallColor;
  elem.className = classes.join(' ');
  this._model.setElementInCurrentCombination(+elem.innerText, this.ballTypes.indexOf(this._selectedBallColor));
};


Controller.prototype.changeSelectedBall = function (elem) {
  var classes = elem.className.split(' '),
      perviousSelectedColor;

  if(classes[3] === 'active-ball') {
    return;
  }
  perviousSelectedColor = document.querySelector('.balls-avaliable .' + this._selectedBallColor);
  perviousSelectedColor.className = 'ball-spot ball ' + this._selectedBallColor;
  this._selectedBallColor = classes[2];
  elem.className += ' active-ball';
};

Controller.prototype.getTurn = function (n) {
  var turnsNumbers = document.getElementsByClassName('turn-number'),
      i;
  for(i = 0; i < turnsNumbers.length; i++) {
    if(+turnsNumbers[i].innerText === n) {
      return turnsNumbers[i].parentNode;
    }
  }
}

Controller.prototype.displayResults = function(res) {
  var results = this._currentTurn.getElementsByClassName('result-spot'),
      i;
  for(i = 0; i < res.cows; i++) {
    if(i < res.bulls)
      results[i].className += ' result bull';
    else
      results[i].className += ' result cow';
  }
}