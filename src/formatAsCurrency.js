const formatAsCurrency = (value, currencySymbol = '$') => {
  if (typeof value === 'string') {
    // if a 'currencySymbol' exists in the string, assume it is already formatted
    if (value.indexOf(currencySymbol) !== -1) return value;
    // if a decimal exists, just add a dollar sign
    if (value.indexOf('.') !== -1) return `${currencySymbol}${value}`;
    // if string represents negative number, put minus sign in front
    if (Number(value) < 0)
      return `-${currencySymbol}${(Number(value) * -1).toFixed(2)}`;
    // by default, add currency symbol and '.00'
    return `${currencySymbol}${value}.00`;
  } else if (typeof value === 'number') {
    // if negative, place the minus sign in front of the currency symbol
    if (value < 0) return `-${currencySymbol}${(value * -1).toFixed(2)}`;
    return `${currencySymbol}${value.toFixed(2)}`;
  } else {
    return value;
  }
};

module.exports = formatAsCurrency;
