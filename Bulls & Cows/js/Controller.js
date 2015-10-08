function Controller (model, view) {
  this._model = model;
  this._view = view;
  this._okButtonEventListener = Controller.prototype.okButtonOnClick.bind(this);

  this.addOkButtonListener();
  this.setAvaliableBallsListeners();
  this.setBallSpotListeners();
}

Controller.prototype.okButtonOnClick = function () {
  var res;
  if(this._model.isGameOver) return;

  res = this._model.compareCombinations();

  if(res === undefined) return;

  this._view.displayResults(res);
  this.removeOkButtonListener();
  this._view.removeOkButton();
  this._model.nextTurn();
  this._view.updateTurn();
  this._view.addOkButton();
  this.addOkButtonListener();
};

Controller.prototype.ballSpotOnClick = function (elem) {
  if(this._model.isGameOver || parseInt(elem.parentNode.parentNode.innerText) !== this._model.turnNumber) {
    return;
  }
  this._view.updateBallSpot(elem);
  this._model.setElementInCurrentCombination(+elem.innerText, this._view.selectedBallType);
};

Controller.prototype.changeSelectedBallType = function (elem) {
  if(/active-ball/.test(elem.className)) return;
  this._view.changeSelectedBallType(elem);
};

Controller.prototype.addOkButtonListener = function() {
  document.querySelector('.ok-button').addEventListener('click', this._okButtonEventListener);
}

Controller.prototype.removeOkButtonListener = function() {
  document.querySelector('.ok-button').removeEventListener('click', this._okButtonEventListener);
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
    ballSpots[i].addEventListener('click', function (event) { self.changeSelectedBallType(event.currentTarget); });
  }
}