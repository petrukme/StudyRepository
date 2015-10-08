function View (model) {
  this._model = model;

  this._ballTypes = ['color-white', 'color-pink', 'color-yellow',
                   'color-green', 'color-red', 'color-blue'];
  this.selectedBallType = 0;

  this.updateTurn();
  this.addOkButton();
}

View.prototype.addOkButton = function() {
  var okButtonDiv = this._currentTurn.querySelector('div.infobox');
  okButtonDiv.className += ' ok-button';
}

View.prototype.removeOkButton = function() {
  var okButtonDiv = document.querySelector('div.ok-button');
  okButtonDiv.className = 'infobox';
}

View.prototype.updateTurn = function () {
  var turnsNumbers = document.getElementsByClassName('turn-number'),
      i;
  for(i = 0; i < turnsNumbers.length; i++) {
    if(+turnsNumbers[i].innerText === this._model.turnNumber) {
      this._currentTurn = turnsNumbers[i].parentNode;
    }
  }
}

View.prototype.displayResults = function(res) {
  var results = this._currentTurn.getElementsByClassName('result-spot'),
      i;
  for(i = 0; i < res.cows; i++) {
    if(i < res.bulls)
      results[i].className += ' result bull';
    else
      results[i].className += ' result cow';
  }
}

View.prototype.changeSelectedBallType = function(newBall) {
  var classes = newBall.className.split(' '),
    perviousSelectedColor = document.querySelector('.balls-avaliable .' + this._ballTypes[this.selectedBallType]);

  perviousSelectedColor.className = 'ball-spot ball ' + this._ballTypes[this.selectedBallType];
  this.selectedBallType = this._ballTypes.indexOf(classes[2]);
  newBall.className += ' active-ball';
}

View.prototype.updateBallSpot = function(ballSpot) {
  ballSpot.className = 'ball-spot ball ' + this._ballTypes[this.selectedBallType];
}