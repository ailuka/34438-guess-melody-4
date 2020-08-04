import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GameScreen from "../game-screen/game-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import {MAX_MISTAKES} from "../../const";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import FailureScreen from "../failure-screen/failure-screen";
import WinScreen from "../win-screen/win-screen";
import {getQuestions} from "../../reducer/data/selectors";
import {getStep, getMistakes} from "../../reducer/game/selectors";
import AuthorizationScreen from "../autrorization-screen/authorization-screen";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import history from "../../history";
import {AppRoute} from "../../const";
import PrivateRoute from "../private-route/private-route";
import {GameType, QuestionGenre, QuestionArtist} from "../../types";

type Question = QuestionArtist | QuestionGenre;

interface Props {
  authorizationStatus: string;
  logIn: () => void;
  questions: Question[];
  onUserAnswer: () => void;
  onWelcomeButtonClick: () => void;
  step: number;
  mistakes: number;
  onReset: () => void;
}

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends React.PureComponent<Props, {}> {
  _renderGameScreen() {
    const {authorizationStatus, questions, onUserAnswer, step, mistakes, onWelcomeButtonClick} = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={MAX_MISTAKES}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= MAX_MISTAKES) {
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return history.push(AppRoute.RESULT);
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }

      return null;
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions, mistakes, onReset, logIn} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <AuthorizationScreen
              onSubmit={logIn}
              onReplayButtonClick={onReset}
            />
          </Route>
          <Route exact path={AppRoute.LOSE}>
            <FailureScreen
              onReplayButtonClick={onReset}
            />
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.RESULT}
            render={() => {
              return (
                <WinScreen
                  questionsCount={questions.length}
                  mistakesCount={mistakes}
                  onReplayButtonClick={onReset}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
  onReset() {
    dispatch(ActionCreator.resetGame());
  },
  logIn(authData) {
    dispatch(UserOperation.logIn(authData));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
