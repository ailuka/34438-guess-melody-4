import questions from "./mocks/questions.js";

export const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`,
};

export const initialMistakesState = {
  maxMistakes: 3,
  count: 0,
};

export const initialStepsState = {
  questions,
  step: -1,
};

export const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
};
