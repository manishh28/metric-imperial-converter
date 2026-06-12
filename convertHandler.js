function ConvertHandler() {

  this.getNum = function(input) {
    // Find index where unit starts (first letter)
    let numStr = input.replace(/[a-zA-Z]+$/, '');

    if (numStr === '') return 1; // default to 1 if no number provided

    // Check for double fraction (more than one '/')
    if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';

    // Handle fraction
    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (isNaN(numerator) || isNaN(denominator)) return 'invalid number';
      return numerator / denominator;
    }

    const num = parseFloat(numStr);
    if (isNaN(num)) return 'invalid number';
    return num;
  };

  this.getUnit = function(input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return 'invalid unit';

    const unit = unitMatch[0];
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit.toLowerCase())) return 'invalid unit';

    // Return uppercase L for liters, lowercase for everything else
    return unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase();
  };

  this.getReturnUnit = function(initUnit) {
    const map = {
      'gal': 'L',
      'L':   'gal',
      'mi':  'km',
      'km':  'mi',
      'lbs': 'kg',
      'kg':  'lbs'
    };
    return map[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const map = {
      'gal': 'gallons',
      'L':   'liters',
      'mi':  'miles',
      'km':  'kilometers',
      'lbs': 'pounds',
      'kg':  'kilograms'
    };
    return map[unit] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const galToL   = 3.78541;
    const lbsToKg  = 0.453592;
    const miToKm   = 1.60934;

    let result;
    switch (initUnit) {
      case 'gal': result = initNum * galToL;       break;
      case 'L':   result = initNum / galToL;       break;
      case 'mi':  result = initNum * miToKm;       break;
      case 'km':  result = initNum / miToKm;       break;
      case 'lbs': result = initNum * lbsToKg;      break;
      case 'kg':  result = initNum / lbsToKg;      break;
      default:    return 'invalid unit';
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
