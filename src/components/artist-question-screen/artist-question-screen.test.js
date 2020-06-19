import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

const question = {
  type: `artist`,
  song: {
    artist: `Lorde`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    picture: `https://api.adorable.io/avatars/128/1`,
    artist: `Пелагея`,
  }, {
    picture: `https://api.adorable.io/avatars/128/2`,
    artist: `Краснознаменная дивизия имени моей бабушки`,
  }, {
    picture: `https://api.adorable.io/avatars/128/3`,
    artist: `Lorde`,
  }],
};

describe(`src/artist-question-screen.jsx`, () => {
  describe(`when there is no questions`, () => {
    it(`should render`, () => {
      const tree = renderer.create(
          <ArtistQuestionScreen
            question={question}
            onAnswerClick={() => null}
          />
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
