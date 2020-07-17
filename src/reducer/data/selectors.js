import {createSelector} from "reselect";
import {NameSpace} from "../name-space.js";
import {GameType} from "../../const.js";

export const getQuestions = (state) => {
  return state[NameSpace.DATA].questions;
};

export const getArtistQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((question) => question.type === GameType.ARTIST);
    }
);

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((question) => question.type === GameType.GENRE);
    }
);
