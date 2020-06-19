import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

describe(`src/artist-question-screen.jsx`, () => {
  describe(`when there is no questions`, () => {
    it(`should render`, () => {
      const tree = renderer.create(
          <ArtistQuestionScreen/>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
