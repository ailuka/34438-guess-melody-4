import {extend} from "./utils.js";
import questions from "./mocks/questions.js";

const initialState = {
  maxMistakes: 3,
  mistakes: 0,
  questions,
  step: -1,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
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
  }

  return state;
};

export {reducer, ActionType};
