var StringCalculator = function() {};

StringCalculator.prototype = {
  add: function(expression) {
    if (this._isEmpty(expression)) return 0;

    var numbers = this._getNumbers(expression);
    return this._sumNumbers(numbers);
  },

  _isEmpty: function(value) {
    return value === '';
  },

  _getNumbers: function(expression) {
    return StringCalculatorExpression.fromString(expression).getNumbers();
  },

  _sumNumbers: function(numbers) {
    return numbers.reduce(function(result, number) {
      return result + number;
    }, 0);
  }

};


StringCalculatorExpression = function(expression) {
  this._expression = expression;
};

StringCalculatorExpression.prototype = {
  DEFAULT_DELIMITER: /[,\n]/,

  getNumbers: function() {
    return this._getExpressionWithoutCustomDelimiter()
      .split(this._getDelimiter())
      .map(this._asNumber);
  },

  _getExpressionWithoutCustomDelimiter: function() {
    if (this._hasCustomDelimiter()) {
      return this._expression.substr(4);
    }

    return this._expression;
  },

  _getDelimiter: function() {
    if (this._hasCustomDelimiter()) {
      return this._combineDelimiters(this.DEFAULT_DELIMITER, this._getCustomDelimiter());
    }

    return this.DEFAULT_DELIMITER;
  },

  _asNumber: function(value) {
    return parseInt(value, 10);
  },

  _hasCustomDelimiter: function() {
    return this._expression.indexOf('//') === 0;
  },

  _getCustomDelimiter: function() {
    return new RegExp('[\\' + this._expression[2] + ']');
  },

  _combineDelimiters: function(delimiter1, delimiter2) {
    return new RegExp(delimiter1.source + '|' + delimiter2.source);
  }
};

StringCalculatorExpression.fromString = function(expressionInString) {
  return new StringCalculatorExpression(expressionInString);
};

module.exports = StringCalculator;