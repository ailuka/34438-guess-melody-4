import React from "react";
import renderer from "react-test-renderer";
import GameScreen from "./game-screen.jsx";
import {GameType} from "../../const.js";

const children = <div className="children-mock-component" />;

describe(`src/game-screen.jsx`, () => {
  describe(`GameScreen should render`, () => {
    it(`with type GameType.ARTIST`, () => {
      const tree = renderer.create(
          <GameScreen
            type={GameType.ARTIST}
          >
            {children}
          </GameScreen>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`with type GameType.GENRE`, () => {
      const tree = renderer.create(
          <GameScreen
            type={GameType.GENRE}
          >
            {children}
          </GameScreen>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
