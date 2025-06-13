export default function decode(word) {
    const wordArray = CryptoJS.enc.Base64.parse(word);
    const result = wordArray.toString(CryptoJS.enc.Utf8);
    return result;
  }