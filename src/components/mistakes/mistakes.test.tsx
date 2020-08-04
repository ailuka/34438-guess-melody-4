import React from "react";
import renderer from "react-test-renderer";
import Mistakes from "./mistakes.jsx";

describe(`src/mistakes`, () => {
  describe(`Mistakes render correctly`, () => {
    it(`With count zero`, () => {
      const tree = renderer.create(
          <Mistakes
            count={0}
          />)
          .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With count one`, () => {
      const tree = renderer.create(
          <Mistakes
            count={1}
          />)
          .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
