function longest(sentence) {
  const words = sentence.split(' ');
  let longestWord = words[0];

  for (const word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  return `${longestWord}: ${longestWord.length} characters`;
}

const sentence = 'Saya sangat senang mengerjakan soal algoritma';
console.log(longest(sentence));
