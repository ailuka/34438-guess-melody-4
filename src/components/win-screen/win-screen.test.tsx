import * as React from "react";
import * as renderer from "react-test-renderer";
import WinScreen from "./win-screen";
import {Router} from "react-router-dom";
import history from "../../history";

describe(`WinScreen`, () => {
  describe(`should render correctly with 3 questions`, () => {
    it(`with 0 mistakes`, () => {
      const winScreen = renderer.create(
          <Router history={history}>
            <WinScreen
              questionsCount={3}
              mistakesCount={0}
              onReplayButtonClick={() => null}
            />
          </Router>
      ).toJSON();

      expect(winScreen).toMatchSnapshot();
    });

    it(`with 2 mistakes`, () => {
      const winScreen = renderer.create(
          <Router history={history}>
            <WinScreen
              questionsCount={3}
              mistakesCount={2}
              onReplayButtonClick={() => null}
            />
          </Router>
      ).toJSON();

      expect(winScreen).toMatchSnapshot();
    });
  });

  describe(`should render correctly with 2 questions`, () => {
    it(`with 0 mistakes`, () => {
      const winScreen = renderer.create(
          <Router history={history}>
            <WinScreen
              questionsCount={2}
              mistakesCount={0}
              onReplayButtonClick={() => null}
            />
          </Router>
      ).toJSON();

      expect(winScreen).toMatchSnapshot();
    });

    it(`with 1 mistake`, () => {
      const winScreen = renderer.create(
          <Router history={history}>
            <WinScreen
              questionsCount={2}
              mistakesCount={1}
              onReplayButtonClick={() => null}
            />
          </Router>
      ).toJSON();

      expect(winScreen).toMatchSnapshot();
    });
  });
});
