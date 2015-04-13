var expect = require('chai').expect;
var StringCalculator = require('./StringCalculator');

describe('StringCalculator', function() {

  describe('#add', function() {
    [
      {
        it: 'should return 0 if empty string given',
        inputExpression: '',
        expect: 0
      },
      {
        it: 'should return the number if a single number given',
        inputExpression: '1',
        expect: 1
      },
      {
        it: 'should return the sum of the given two numbers separated by comma',
        inputExpression: '1,2',
        expect: 3
      },
      {
        it: 'should return the sum of the given numbers even if they are more then 2',
        inputExpression: '1,2,3,4',
        expect: 10
      },
      {
        it: 'should accept the new line as delimiter',
        inputExpression: '1\n2\n3',
        expect: 6
      },
      {
        it: 'should accept mixing the comma and the new line delimiters',
        inputExpression: '1\n2,3',
        expect: 6
      },
      {
        it: 'should accept a custom delimiter if its given in the beginning',
        inputExpression: '//;\n1;2',
        expect: 3
      },
      {
        it: 'should accept mixing all of the delimiters above',
        inputExpression: '//;\n1;2,3\n4',
        expect: 10
      },
      {
        it: 'should accept special characters',
        inputExpression: '//]\n1]2',
        expect: 3
      }
    ].forEach(function(testCase) {
        it(testCase.it, function() {
          var stringCalculator = new StringCalculator();
          var result = stringCalculator.add(testCase.inputExpression);
          expect(result).to.eql(testCase.expect);
        });
      });

  });

});