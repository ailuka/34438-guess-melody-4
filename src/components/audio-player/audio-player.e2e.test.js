import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
};

describe(`AudioPlayer`, () => {
  it(`play button click changes button to pause`, () => {
    const {song} = mock;
    const onPlayButtonClick = jest.fn();

    const spyOnPause = jest.spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});

    const audioPlayer = mount(
        <AudioPlayer
          isPlaying={false}
          src={song.src}
          onPlayButtonClick={onPlayButtonClick}
        />
    );

    expect(audioPlayer.state().isPlaying).toEqual(false);
    expect(audioPlayer.find(`.track__button--play`)).toHaveLength(1);

    const trackButton = audioPlayer.find(`.track__button`);
    expect(trackButton).toHaveLength(1);

    audioPlayer.setState({isLoading: false});
    trackButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalled();

    expect(audioPlayer.state().isPlaying).toEqual(true);
    expect(audioPlayer.find(`.track__button--pause`)).toHaveLength(1);

    spyOnPause.mockRestore();
  });

  it(`pause button click changes button to play`, () => {
    const {song} = mock;
    const onPlayButtonClick = jest.fn();

    const spyOnPlay = jest.spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});

    const audioPlayer = mount(
        <AudioPlayer
          isPlaying={true}
          src={song.src}
          onPlayButtonClick={onPlayButtonClick}
        />
    );

    expect(audioPlayer.state().isPlaying).toEqual(true);
    expect(audioPlayer.find(`.track__button--pause`)).toHaveLength(1);

    const trackButton = audioPlayer.find(`.track__button`);
    expect(trackButton).toHaveLength(1);

    audioPlayer.setState({isLoading: false});
    trackButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalled();

    expect(audioPlayer.state().isPlaying).toEqual(false);
    expect(audioPlayer.find(`.track__button--play`)).toHaveLength(1);

    spyOnPlay.mockRestore();
  });
});
