// Encodes numbers into short, URL-safe base62 strings (0-9, a-z, A-Z),
// and generates random short codes for new URLs.

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = ALPHABET.length;

function encode(num) {
  if (num === 0) return ALPHABET[0];
  let result = '';
  while (num > 0) {
    result = ALPHABET[num % BASE] + result;
    num = Math.floor(num / BASE);
  }
  return result;
}

// Generates a random base62 short code of the given length (default 7),
// using a large random number so codes stay unpredictable.
function generateShortCode(length = 7) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += ALPHABET[Math.floor(Math.random() * BASE)];
  }
  return code;
}

module.exports = { encode, generateShortCode };
