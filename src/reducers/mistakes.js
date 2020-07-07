import {ActionType, MAX_MISTAKES} from "../const.js";

const INITIAL_MISTAKES = 0;

const mistakes = (state = INITIAL_MISTAKES, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      const newCount = state + action.payload;

      if (newCount >= MAX_MISTAKES) {
        return state;
      }
      return newCount;
  }

  return state;
};

export {mistakes};
