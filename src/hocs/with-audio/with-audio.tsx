import * as React from "react";

interface Props {
  isPlaying: boolean;
  src: string;
  onPlayButtonClick: () => void;
}

interface State {
  progress: number;
  isLoading: boolean;
  isPlaying: boolean;
}

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent<Props, State> {
    private _audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
      };
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;
      audio.src = src;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => this.setState({
        isPlaying: true,
      });

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.state.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    render() {
      const {isLoading, isPlaying} = this.state;
      const {onPlayButtonClick} = this.props;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayButtonClick={() => {
            this.setState({isPlaying: !isPlaying});
            onPlayButtonClick();
          }}
        >
          <audio
            ref={this._audioRef}
          />
        </Component>
      );
    }
  }

  return WithAudio;
};

export default withAudio;
