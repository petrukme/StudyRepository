function Model() {
  this.BALL_TYPES_NUMBER = 6;

  this._combination = [0, 0, 0, 0];
  this._currentCombination = [];

  this.turnNumber = 1;
  this.isGameOver = false;

  this.generateCombination();
};

Model.prototype.generateCombination = function () {
  this._combination = this._combination.map( a => Utils.getRandomInt(0, this.BALL_TYPES_NUMBER));
}

Model.prototype.isCombinationReady = function () {
  return !Utils.haveUndefinedElements(this._currentCombination, this._combination.length);
}

Model.prototype.nextTurn = function() {
  if(this.turnNumber === 8) {
    this.gameOver('You lost!');
  }
  this.currentCombination = [];
  this.turnNumber++;
}

Model.prototype.compareCombinations = function() {
  var res = {};

  if(!this.isCombinationReady()) {
    return;
  }

  res.bulls = Utils.gotSameColorAndPosition(this._currentCombination, this._combination),
  res.cows = Utils.gotSameColor(this._currentCombination, this._combination)

  if(res.bulls === this._combination.length) {
    this.gameOver('Victory!');
    return;
  }
  return res;
}

Model.prototype.setElementInCurrentCombination = function(index, value) {
  this._currentCombination[index] = value;
}

Model.prototype.gameOver = function(msg) {
  if(arguments.length > 0) {
    alert(msg);
  }
  this.isGameOver = true;
}