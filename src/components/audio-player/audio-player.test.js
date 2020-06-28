import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
};

describe(`src/audio-player.jsx`, () => {
  describe(`when the song is paused`, () => {
    it(`should render with play button`, () => {
      const {song} = mock;

      const tree = renderer.create(
          <AudioPlayer
            isPlaying={false}
            src={song.src}
            onPlayButtonClick={() => null}
          />, {
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
      const {song} = mock;

      const tree = renderer.create(
          <AudioPlayer
            isPlaying={true}
            src={song.src}
            onPlayButtonClick={() => null}
          />, {
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
