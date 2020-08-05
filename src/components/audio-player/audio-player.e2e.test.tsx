import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player";

configure({
  adapter: new Adapter(),
});

describe(`AudioPlayer`, () => {
  it(`play button click changes button to pause`, () => {
    const onPlayButtonClick = jest.fn();

    const audioPlayer = shallow(
        <AudioPlayer
          isLoading={true}
          isPlaying={false}
          onPlayButtonClick={onPlayButtonClick}
        >
          <audio/>
        </AudioPlayer>
    );

    expect(audioPlayer.find(`.track__button--play`)).toHaveLength(1);

    const trackButton = audioPlayer.find(`.track__button`);
    expect(trackButton).toHaveLength(1);

    trackButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`pause button click changes button to play`, () => {
    const onPlayButtonClick = jest.fn();

    const audioPlayer = shallow(
        <AudioPlayer
          isLoading={false}
          isPlaying={true}
          onPlayButtonClick={onPlayButtonClick}
        >
          <audio/>
        </AudioPlayer>
    );

    expect(audioPlayer.find(`.track__button--pause`)).toHaveLength(1);

    const trackButton = audioPlayer.find(`.track__button`);
    expect(trackButton).toHaveLength(1);

    trackButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  });
});
