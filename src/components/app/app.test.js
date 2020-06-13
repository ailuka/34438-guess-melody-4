import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

describe(`Render App`, () => {
  it(`App rendered correctly`, () => {
    const tree = renderer.create(
        <App
          errorsCount={3}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
