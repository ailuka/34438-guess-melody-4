import * as React from "react";
import * as renderer from "react-test-renderer";
import FailureScreen from "./failure-screen";
import {Router} from "react-router-dom";
import history from "../../history";

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
