import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withAudio from "./with-audio";

configure({
  adapter: new Adapter(),
});

interface PlayerProps {
  children: React.ReactNode;
  onPlayButtonClick: () => void;
}

const Player = (props: PlayerProps) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      <div className="track__status">
        {children}
      </div>
    </div>
  );
};

describe(`withAudioPlayer`, () => {
  it(`Checks that HOC's callback turn on audio (play)`, () => {

    const spyOnPlay = jest.spyOn(window.HTMLMediaElement.prototype, `play`)
    .mockImplementation(jest.fn());

    const PlayerWrapped = withAudio(Player);

    const withAudioPlayer = mount(
        <PlayerWrapped
          isPlaying={false}
          onPlayButtonClick={() => null}
          src=""
        />
    );

    const trackButton = withAudioPlayer.find(`button`);
    expect(trackButton).toHaveLength(1);

    trackButton.simulate(`click`);

    expect(spyOnPlay).toHaveBeenCalledTimes(1);

    spyOnPlay.mockRestore();
  });
});

