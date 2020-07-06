import {GameType, ActionType} from "../const.js";
import {combineReducers} from "redux";
import {mistakes} from "./mistakes.js";
import {steps} from "./steps.js";

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
};


const reducer = combineReducers({mistakes, steps});

export {reducer, ActionType, ActionCreator, isGenreAnswerCorrect};
