import * as React from "react";
import * as renderer from "react-test-renderer";
import AuthorizationScreen from "./authorization-screen";

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
