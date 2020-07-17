import {extend} from "../../utils.js";
import {GameType} from "../../const.js";

const initialState = {
  mistakes: 0,
  step: -1,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  if (userAnswer.length !== question.answers.length) {
    return false;
  }

  return question.answers.every((answer, i) => {
    return (answer.genre === question.genre) === userAnswer[i];
  });
};

const ActionCreator = {
  incrementMistake: (question, userAnswer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  resetGame: () => ({
    type: ActionType.RESET_GAME,
    payload: null,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.RESET_GAME:
      return extend(initialState, {
        step: 0,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, isGenreAnswerCorrect};
