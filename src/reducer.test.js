import {reducer, ActionType, ActionCreator} from "./reducer.js";
import questions from "./test-mocks/test-mocks.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    maxMistakes: 3,
    mistakes: 0,
    questions,
    step: -1,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  })).toEqual({
    step: 0,
    mistakes: 0,
    questions,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    step: -1,
    mistakes: 0,
    questions,
  });
});

it(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  })).toEqual({
    step: -1,
    mistakes: 1,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0,
  })).toEqual({
    step: -1,
    mistakes: 0,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`ActionCreator.incrementMistake returns payload: 0, when user answer for artist question is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          picture: ``,
          artist: `correct`,
        },
        {
          picture: ``,
          artist: `incorrect-1`,
        },
        {
          picture: ``,
          artist: `incorrect-2`,
        }
      ]
    }, {
      picture: ``,
      artist: `correct`,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`ActionCreator.incrementMistake returns payload: 1, when user answer for artist question is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          picture: ``,
          artist: `correct`,
        },
        {
          picture: ``,
          artist: `incorrect-1`,
        },
        {
          picture: ``,
          artist: `incorrect-2`,
        }
      ]
    }, {
      picture: ``,
      artist: `incorrect`,
    })).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`ActionCreator.incrementMistake returns payload: 0, when answer for genre question is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          src: ``,
          genre: `rock`,
        }, {
          src: ``,
          genre: `jazz`,
        }, {
          src: ``,
          genre: `blues`,
        }, {
          src: ``,
          genre: `blues`,
        },
      ]
    }, [false, true, false, false])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`ActionCreator.incrementMistake returns payload: 1, when answer for genre question is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          src: ``,
          genre: `blues`,
        }, {
          src: ``,
          genre: `blues`,
        }, {
          src: ``,
          genre: `blues`,
        }, {
          src: ``,
          genre: `blues`,
        },
      ]
    }, [true, true, true, true])).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });
});
