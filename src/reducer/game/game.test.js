import {ActionCreator, ActionType, isGenreAnswerCorrect, reducer} from "./game.js";

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

  it(`ActionCreator.resetGame returns payload: 0`, () => {
    expect(ActionCreator.resetGame()).toEqual({
      type: ActionType.RESET_GAME,
      payload: null,
    });
  });
});

describe(`isGenreAnswerCorrect`, () => {
  describe(`No songs with the genre`, () => {
    const question = {
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
    };

    it(`returns true, when user answer has no songs selected`, () => {
      const userAnswer = [false, false, false, false];
      expect(isGenreAnswerCorrect(question, userAnswer)).toEqual(true);
    });

    it(`returns false, when user answer has any song selected`, () => {
      const userAnswer1 = [false, true, false, false];
      expect(isGenreAnswerCorrect(question, userAnswer1)).toEqual(false);

      const userAnswer2 = [true, false, false, false];
      expect(isGenreAnswerCorrect(question, userAnswer2)).toEqual(false);

      const userAnswer3 = [false, false, false, true];
      expect(isGenreAnswerCorrect(question, userAnswer3)).toEqual(false);
    });
  });

  describe(`Some songs with the genre`, () => {
    const question = {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          src: ``,
          genre: `jazz`,
        }, {
          src: ``,
          genre: `blues`,
        }, {
          src: ``,
          genre: `jazz`,
        }, {
          src: ``,
          genre: `blues`,
        },
      ]
    };

    it(`returns false, when user answer has no songs selected`, () => {
      const userAnswer = [false, false, false, false];
      expect(isGenreAnswerCorrect(question, userAnswer)).toEqual(false);
    });

    it(`returns true, when user answer has correct songs selected`, () => {
      const userAnswer = [true, false, true, false];
      expect(isGenreAnswerCorrect(question, userAnswer)).toEqual(true);
    });

    it(`returns false, when user answer has all correct and some incorrect songs selected`, () => {
      const userAnswer = [true, false, true, true];
      expect(isGenreAnswerCorrect(question, userAnswer)).toEqual(false);
    });

    it(`returns false, when user answer has some correct and some incorrect songs selected`, () => {
      const userAnswer = [false, false, true, true];
      expect(isGenreAnswerCorrect(question, userAnswer)).toEqual(false);
    });

    it(`returns false, when user answer has only incorrect songs selected`, () => {
      const userAnswer = [false, true, false, true];
      expect(isGenreAnswerCorrect(question, userAnswer)).toEqual(false);
    });

    it(`returns false, when user answer has wrong number of songs`, () => {
      const userAnswer = [true, false, true, false, false];
      expect(isGenreAnswerCorrect(question, userAnswer)).toEqual(false);
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
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
});
