import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: ``,
      src: ``
    },
    answers: [
      {
        artist: `one`,
        picture: `pic-one`,
      },
      {
        artist: `two`,
        picture: `pic-two`,
      },
      {
        artist: `three`,
        picture: `pic-three`,
      },
    ],
  }
};

const mockEvent = {
  preventDefault() {}
};

describe(`ArtistQuestionScreen`, () => {
  it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
    const {question} = mock;
    const onAnswerClick = jest.fn();
    const userAnswer = {
      artist: `one`,
      picture: `pic-one`,
    };

    const artistQuestionScreen = shallow(
        <ArtistQuestionScreen
          question={question}
          onAnswerClick={onAnswerClick}
        />
    );

    const answerInputs = artistQuestionScreen.find(`input`);
    const answerOne = answerInputs.at(0);
    answerOne.simulate(`change`, mockEvent);

    expect(onAnswerClick).toHaveBeenCalledTimes(1);
    expect(onAnswerClick.mock.calls[0][0]).toMatchObject(question);
    expect(onAnswerClick.mock.calls[0][1]).toMatchObject(userAnswer);
  });
});
