import * as React from "react";
import {configure, shallow, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen";
import {GameType, QuestionGenre} from "../../types";

configure({
  adapter: new Adapter(),
});

const question: QuestionGenre = {
  type: GameType.GENRE,
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
};

describe(`GenreQuestionScreen`, () => {
  it(`When user answers genre question form is not sent`, () => {
    const onAnswer = jest.fn();

    const genreQuestionScreen = shallow(
        <GenreQuestionScreen
          question={question}
          onAnswer={onAnswer}
          renderPlayer={() => null}
          onChange={() => null}
          userAnswers={[false, false, false, false]}
        />
    );

    const form = genreQuestionScreen.find(`form`);
    const formSendPrevention = jest.fn();
    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
    const onAnswer = jest.fn((...args) => [...args]);
    const userAnswer = [false, true, false, false];

    const genreQuestionScreen = mount(
        <GenreQuestionScreen
          question={question}
          onAnswer={onAnswer}
          renderPlayer={() => null}
          onChange={() => null}
          userAnswers={userAnswer}
        />
    );

    const form = genreQuestionScreen.find(`form`);
    const inputTwo = genreQuestionScreen.find(`input`).at(1);

    inputTwo.simulate(`change`, {target: {checked: true}});
    form.simulate(`submit`, {});

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer.mock.calls[0][0]).toEqual(undefined);

    expect(
        genreQuestionScreen.find(`input`).map((it) => {
          return it.prop(`checked`);
        })
    ).toEqual(userAnswer);
  });
});
