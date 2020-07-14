import {extend} from "../utils.js";
import {ActionType} from "../const.js";
import questions from "../mocks/questions.js";

const initialStepsState = {
  questions,
  step: -1,
};

const steps = (state = initialStepsState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.RESET_GAME:
      return extend(initialStepsState, {
        step: 0,
      });
  }

  return state;
};

export {steps};
