import * as React from "react";
import {AnswerArtist, QuestionArtist} from "../../types";

interface Props {
  question: QuestionArtist;
  onAnswer: (question: QuestionArtist, answer: AnswerArtist) => void;
  renderPlayer: (string, number) => React.ReactNode;
};

const ArtistQuestionScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {question, onAnswer, renderPlayer} = props;
  const {song, answers} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(song.src, 0)}
        </div>
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => {
          return (
            <div key={answer.artist} className="artist">
              <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}`} id={`answer-${i}`}
                onChange={(evt) => {
                  evt.preventDefault();
                  onAnswer(question, answer);
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

export default ArtistQuestionScreen;
