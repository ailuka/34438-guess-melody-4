import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

describe(`GenreQuestionScreen`, () => {
  it(`When user answers genre question form is not sent`, () => {
    const {question} = mock;
    const onAnswerClick = jest.fn();

    const genreQuestionScreen = shallow(
        <GenreQuestionScreen
          question={question}
          onAnswerClick={onAnswerClick}
          renderPlayer={() => null}
        />
    );

    const form = genreQuestionScreen.find(`form`);
    const formSendPrevention = jest.fn();
    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onAnswerClick).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
    const {question} = mock;
    const onAnswerClick = jest.fn((...args) => [...args]);
    const userAnswer = [false, true, false, false];

    const genreQuestionScreen = shallow(
        <GenreQuestionScreen
          question={question}
          onAnswerClick={onAnswerClick}
          renderPlayer={() => null}
        />
    );

    const form = genreQuestionScreen.find(`form`);
    const inputTwo = genreQuestionScreen.find(`input`).at(1);

    inputTwo.simulate(`change`, {target: {checked: true}});
    form.simulate(`submit`, {preventDefault() {}});

    expect(onAnswerClick).toHaveBeenCalledTimes(1);
    expect(onAnswerClick.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswerClick.mock.calls[0][1]).toMatchObject(userAnswer);

    expect(
        genreQuestionScreen.find(`input`).map((it) => {
          return it.prop(`checked`);
        })
    ).toEqual(userAnswer);
  });
});
