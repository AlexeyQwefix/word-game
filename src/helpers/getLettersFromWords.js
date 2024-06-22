const getLettersFromWords = (words) => {
  const accumulator = {};
  words.forEach((word) => {
    const localAcc = {};
    word
      .split("")
      .forEach((letter) =>
        localAcc.hasOwnProperty(letter)
          ? (localAcc[letter] = localAcc[letter] + 1)
          : (localAcc[letter] = 1)
      );
    for (const letter in localAcc) {
      if (accumulator.hasOwnProperty(letter)) {
        accumulator[letter] =
          accumulator[letter] >= localAcc[letter]
            ? accumulator[letter]
            : localAcc[letter];
      } else {
        accumulator[letter] = localAcc[letter];
      }
    }
  });
  const res = [];

  for (const letter in accumulator) {
    for (let i = 0; i < accumulator[letter]; i++) {
      res.push(letter);
    }
  }
  return res.sort(() => Math.random() - 0.5);
};
export default getLettersFromWords;
