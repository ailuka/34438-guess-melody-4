import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen";

configure({
  adapter: new Adapter(),
});

describe(`WelcomeScreen`, () => {
  it(`Welcome button should be pressed`, () => {
    const onWelcomeButtonClick = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen
          errorsCount={3}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
    );

    const welcomeButton = welcomeScreen.find(`button.welcome__button`);
    welcomeButton.props().onClick();

    expect(onWelcomeButtonClick.mock.calls.length).toBe(1);
  });
});
