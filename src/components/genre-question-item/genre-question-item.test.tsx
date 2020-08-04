import * as React from "react";
import * as renderer from "react-test-renderer";
import GenreQuestionItem from "./genre-question-item";

const answer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/3/38/Stalker-Last_Laugh.ogg`,
  genre: `rock`,
};

describe(`GenreQuestionItem`, () => {
  it(`is rendered correctly`, () => {
    const tree = renderer.create(
        <GenreQuestionItem
          answer={answer}
          id={0}
          onChange={() => null}
          renderPlayer={() => null}
          userAnswer={false}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
