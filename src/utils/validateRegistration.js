exports.validateRegistrationInput = (data) => {
  const { email, overlay, quiz, subjects } = data;
  if (
    email.length > 5 &&
    quiz.type === "custom" &&
    subjects.length === quiz.nQuiz
  ) {
    return true;
  } else if (quiz.type !== "custom" && email.length > 5) {
    return true;
  }
  return false;
};
