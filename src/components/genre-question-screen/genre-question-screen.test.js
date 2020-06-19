import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionScreen from "./genre-question-screen.jsx";

describe(`src/genre-question-screen.jsx`, () => {
  describe(`when there is no questions`, () => {
    it(`should render`, () => {
      const tree = renderer.create(
          <GenreQuestionScreen/>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
