import {extend} from "../utils.js";
import {ActionType, initialStepsState} from "../const.js";

const steps = (state = initialStepsState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + action.payload;

      if (nextStep >= state.questions.length) {
        return extend({}, initialStepsState);
      }

      return extend(state, {
        step: nextStep,
      });
  }

  return state;
};

export {steps};
