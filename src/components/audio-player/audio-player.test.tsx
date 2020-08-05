import * as React from "react";
import * as renderer from "react-test-renderer";
import AudioPlayer from "./audio-player";

describe(`src/audio-player.jsx`, () => {
  describe(`when the song is paused`, () => {
    it(`should render with play button`, () => {

      const tree = renderer.create(
          <AudioPlayer
            isPlaying={false}
            isLoading={true}
            onPlayButtonClick={() => null}
          >
            <audio/>
          </AudioPlayer>, {
            createNodeMock: () => {
              return {};
            },
          }
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when the song is playing`, () => {
    it(`should render with pause button`, () => {

      const tree = renderer.create(
          <AudioPlayer
            isPlaying={true}
            isLoading={false}
            onPlayButtonClick={() => null}
          >
            <audio/>
          </AudioPlayer>, {
            createNodeMock: () => {
              return {};
            },
          }
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
