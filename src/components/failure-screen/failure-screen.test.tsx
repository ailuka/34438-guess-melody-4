import React from "react";
import renderer from "react-test-renderer";
import FailureScreen from "./failure-screen.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

describe(`FailureScreen`, () => {
  it(`should render correctly`, () => {
    const failureScreen = renderer.create(
        <Router history={history}>
          <FailureScreen
            onReplayButtonClick={() => null}
          />
        </Router>
    ).toJSON();

    expect(failureScreen).toMatchSnapshot();
  });
});
