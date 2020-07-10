import questions from "../test-mocks/test-mocks.js";
import {ActionType} from "../const.js";
import {steps} from "./steps.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(steps(undefined, {})).toEqual({
    questions,
    step: -1,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(steps({
    questions,
    step: -1,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  })).toEqual({
    questions,
    step: 0,
  });

  expect(steps({
    step: -1,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    step: -1,
    questions,
  });
});

it(`Reducer should return default`, () => {
  expect(steps({
    step: 5,
    questions,
  }, {
    type: ActionType.RESET_GAME,
    payload: null,
  })).toEqual({
    step: 0,
    questions,
  });

  expect(steps({
    step: 0,
    questions,
  }, {
    type: ActionType.RESET_GAME,
    payload: null,
  })).toEqual({
    step: 0,
    questions,
  });

  expect(steps({
    step: -1,
    questions,
  }, {
    type: ActionType.RESET_GAME,
    payload: null,
  })).toEqual({
    step: 0,
    questions,
  });
});

