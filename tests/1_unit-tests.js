const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('decimal number input', function() {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('fractional input', function() {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  test('fractional input with decimal', function() {
    assert.approximately(convertHandler.getNum('2.5/6gal'), 2.5/6, 0.00001);
  });

  test('double-fraction returns error', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('no number defaults to 1', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('read each valid input unit', function() {
    const valid = ['gal','L','mi','km','lbs','kg','GAL','l','MI','KM','LBS','KG'];
    valid.forEach(u => {
      assert.notEqual(convertHandler.getUnit(u), 'invalid unit');
    });
  });

  test('invalid input unit returns error', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('return the correct return unit for each valid input unit', function() {
    const pairs = [['gal','L'],['L','gal'],['mi','km'],['km','mi'],['lbs','kg'],['kg','lbs']];
    pairs.forEach(([init, expected]) => {
      assert.equal(convertHandler.getReturnUnit(init), expected);
    });
  });

  test('spelled-out string unit for each valid input unit', function() {
    const pairs = [
      ['gal','gallons'],['L','liters'],['mi','miles'],
      ['km','kilometers'],['lbs','pounds'],['kg','kilograms']
    ];
    pairs.forEach(([unit, spelled]) => {
      assert.equal(convertHandler.spellOutUnit(unit), spelled);
    });
  });

  test('gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
  });

  test('mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });

  test('lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
  });

  test('kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });

});
