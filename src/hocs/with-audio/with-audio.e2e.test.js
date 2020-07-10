import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAudio from "./with-audio.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const Player = (props) => {
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

Player.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

describe(`withAudioPlayer`, () => {
  it(`Checks that HOC's callback turn on audio (play)`, () => {

    const spyOnPlay = jest.spyOn(window.HTMLMediaElement.prototype, `play`)
    .mockImplementation(() => {});

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

