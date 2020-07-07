import {mistakes} from "./mistakes.js";
import {ActionType} from "../const.js";

it(`Mistakes reducer without additional parameters should return initial state`, () => {
  expect(mistakes(undefined, {})).toEqual(0);
});

it(`Mistakes reducer should increment mistakes count by a given value`, () => {
  expect(mistakes(0, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  })).toEqual(1);

  expect(mistakes(0, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0,
  })).toEqual(0);
});
