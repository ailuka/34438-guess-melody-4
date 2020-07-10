import React from "react";
import renderer from "react-test-renderer";
import FailureScreen from "./failure-screen.jsx";

describe(`FailureScreen`, () => {
  it(`should render correctly`, () => {
    const failureScreen = renderer.create(
        <FailureScreen
          onReplayButtonClick={() => null}
        />
    ).toJSON();

    expect(failureScreen).toMatchSnapshot();
  });
});
