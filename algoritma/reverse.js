function reverseAlphabet(str) {
  const alphabets = str.replace(/\d/g, '').split('').reverse().join('');
  const numbers = str.replace(/[a-zA-Z]/g, '');
  return alphabets + numbers;
}

const result = reverseAlphabet('EIGEN1');
console.log(result);
