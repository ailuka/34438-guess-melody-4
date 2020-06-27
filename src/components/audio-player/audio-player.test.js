import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
};

describe(`src/audio-player.jsx`, () => {
  describe(`when there is a song`, () => {
    it(`should render`, () => {
      const {song} = mock;

      const tree = renderer.create(
          <AudioPlayer
            isPlaying={false}
            src={song.src}
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
