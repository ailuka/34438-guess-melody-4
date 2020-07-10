import {ActionType} from "../const.js";

const INITIAL_MISTAKES = 0;

const mistakes = (state = INITIAL_MISTAKES, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      return state + action.payload;
  }

  return state;
};

export {mistakes};
