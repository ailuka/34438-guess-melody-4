import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionItem from "./genre-question-item.jsx";

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
