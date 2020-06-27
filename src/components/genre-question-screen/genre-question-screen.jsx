import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";
import AudioPlayer from "../audio-player/audio-player.jsx";

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false],
    };
  }

  render() {
    const {question, onAnswerClick} = this.props;
    const {answers: userAnswers} = this.state;
    const {genre, answers} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswerClick(question, this.state.answers);
          }}
          className="game__tracks"
        >
          {answers.map((answer, i) => {
            return (
              <div key={`${i}-${answer.src}`} className="track">
                <AudioPlayer
                  isPlaying={i === 0}
                  src={answer.src}
                />
                <div className="game__answer">
                  <input
                    onChange={(evt) => {
                      const value = evt.target.checked;

                      this.setState({
                        answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
                      });
                    }}
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${i}`}
                    id={`answer-${i}`}
                    checked={userAnswers[i]}
                  />
                  <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                </div>
              </div>
            );
          })}
          <button className="game__submit button" type="submit">
            Ответить
          </button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.shape.isRequired,
          genre: PropTypes.string.isRequired,
        })
    ).isRequired,
  }).isRequired,
  onAnswerClick: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
