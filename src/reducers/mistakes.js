import {extend} from "../utils.js";
import {ActionType, initialMistakesState} from "../const.js";

const mistakes = (state = initialMistakesState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      const newCount = state.count + action.payload;

      if (newCount >= state.maxMistakes) {
        return extend({}, initialMistakesState);
      }

      return extend(state, {
        count: newCount,
      });
  }

  return state;
};

export {mistakes};
