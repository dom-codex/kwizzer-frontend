module.exports.resulReducer = (state, action) => {
  switch (action.type) {
    case "load":
      return {
        ...state,
        quizzes: action.quizzes,
        exams: action.exams,
      };
    case "toggle":
      return {
        ...state,
        toggle: !state.toggle,
      };
    default:
      return state;
  }
};
