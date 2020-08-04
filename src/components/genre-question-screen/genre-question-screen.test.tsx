import * as React from "react";
import * as renderer from "react-test-renderer";
import GenreQuestionScreen from "./genre-question-screen";

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/3/38/Stalker-Last_Laugh.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/44/Blues_en_F_-_tempo_60_%C3%A0_120.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/2/21/03_Turning_Points.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/2/2f/Dr_House.ogg`,
    genre: `rock`,
  }],
};

describe(`src/genre-question-screen.jsx`, () => {
  describe(`when there is a question`, () => {
    it(`should render`, () => {
      const tree = renderer.create(
          <GenreQuestionScreen
            question={question}
            onAnswer={() => null}
            renderPlayer={() => null}
            onChange={() => null}
            userAnswers={[false, false, false, false]}
          />, {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
