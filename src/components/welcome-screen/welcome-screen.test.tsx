import * as React from "react";
import * as renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";

describe(`Render WelcomeScreen`, () => {
  it(`Welcome screen rendered correctly`, () => {
    const tree = renderer.create(
        <WelcomeScreen
          errorsCount={3}
          onWelcomeButtonClick={() => {}}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
