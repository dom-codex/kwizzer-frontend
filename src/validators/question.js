module.exports.validateQuestion = (opts, answer, question) => {
  let count = 0;
  const options = opts.length;
  opts.forEach((option) => {
    if (option.value.length) count++;
  });
  if (
    options >= 2 &&
    answer.length >= 1 &&
    question.length &&
    count === options
  ) {
    return true;
  }
  return false;
};
