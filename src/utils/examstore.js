module.exports.examsReducer = (state, action) => {
  switch (action.type) {
    case "init":
      const quizzes = action.quizzes;
      const currentQuiz = quizzes[state.currentQuizIndex];
      const questions = currentQuiz.questions;
      return {
        ...state,
        id: action.sheet,
        quizzes: quizzes,
        currentQuiz: currentQuiz,
        questions: questions,
      };
    case "answer_a_question":
      const question = state.questions[state.currentQuestionIndex];
      question.answered = true;
      question.answer = action.answer;
      state.questions[state.currentQuestionIndex] = question;
      action.submit(action.answer);
      return {
        ...state,
      };
    case "next":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case "prev":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };
    case "change_quiz":
      const currentQuizz = state.quizzes[action.index];
      const questionss = currentQuizz.questions;
      return {
        ...state,
        currentQuiz: currentQuizz,
        currentQuizIndex: action.index,
        questions: questionss,
        currentQuestionIndex: 0,
      };
    case "dialog":
      return {
        ...state,
        showDialog: true,
      };
    default:
      return state;
  }
};
/*state
{
    quizzes,
    currentquiz,
    currentquestion,
    currentQuizIndex:0,
    currentQuestionIndex:0
}
*/
