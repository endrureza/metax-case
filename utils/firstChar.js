/**
 * Get first char from each word in a string
 * Taken from : https://stackoverflow.com/questions/8279859/get-first-letter-of-each-word-in-a-string-in-javascript
 *
 * @param {string} str
 * @returns
 */
const firstChar = (str) => {
  if (str == "") {
    return "MC";
  }

  var matches = str.match(/\b(\w)/g);
  var acronym = matches.join("");

  return acronym;
};

export default firstChar;
