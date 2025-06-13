export default function encode(word) {
    const wordArray = CryptoJS.enc.Utf8.parse(word);
    const result = CryptoJS.enc.Base64.stringify(wordArray);
    return result;
  }