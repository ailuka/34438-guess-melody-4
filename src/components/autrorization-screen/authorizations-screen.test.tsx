import React from "react";
import renderer from "react-test-renderer";
import AuthorizationScreen from "./authorization-screen.jsx";

describe(`AuthorizationScreen`, () => {
  it(`should render correctly`, () => {
    const authScreen = renderer.create(
        <AuthorizationScreen
          onSubmit={() => null}
          onReplayButtonClick={() => null}
        />
    ).toJSON();

    expect(authScreen).toMatchSnapshot();
  });
});
