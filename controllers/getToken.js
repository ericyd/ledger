/**
 * Simple function to parse the JWT token out of the headers.
 * Thanks: https://devdactic.com/restful-api-user-authentication-1/
 */
module.exports = function getToken(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
