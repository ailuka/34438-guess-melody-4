import React from "react";
import PropTypes from "prop-types";

const ArtistQuestionScreen = (props) => {
  const {question, onAnswerClick} = props;
  const {song, answers} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <button className="track__button track__button--play" type="button"></button>
          <div className="track__status">
            <audio src={song.src}></audio>
          </div>
        </div>
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => {
          return (
            <div key={answer.artist} className="artist">
              <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}`} id={`answer-${i}`}
                onChange={(evt) => {
                  evt.preventDefault();
                  onAnswerClick(question, answer);
                }}
              />
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                {answer.artist}
              </label>
            </div>
          );
        })}
      </form>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([`artist`, `genre`]).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          artist: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
        })
    ).isRequired,
  }).isRequired,
  onAnswerClick: PropTypes.func.isRequired,
};

export default ArtistQuestionScreen;
