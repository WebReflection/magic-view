/**
 * @param {string} str
 * @returns {number}
 */
export default str => {
  let count = 0;
  for (let i = 0, length = str.length; i < length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) count += 1;
    else if (code < 0x800) count += 2;
    else if (code >= 0xD800 && code <= 0xDBFF && i + 1 < length) {
      let nextCode = str.charCodeAt(i + 1);
      if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
        count += 4;
        i++;
      }
      else count += 3;
    }
    else count += 3;
  }
  return count;
};
