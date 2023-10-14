export const decodeHTMLEntities = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

export const shuffleAnswers = (wrongAnswers, correctAnswer) => {
  let options = [];
  wrongAnswers.map((ans) => options.push(ans));
  options.push(correctAnswer);

  //The Fisher-Yates algorith, randomly change the answers sequence
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = options[i];
    options[i] = options[j];
    options[j] = temp;
  }

  return options;
};
