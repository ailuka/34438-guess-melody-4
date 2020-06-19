import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";

const App = (props) => {
  const {errorsCount, questions} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen
            errorsCount={errorsCount}
            onWelcomeButtonClick={() => null}
          />
        </Route>
        <Route exact path="/dev-artist">
          <ArtistQuestionScreen
            question={questions[1]}
            onAnswerClick={() => null}
          />
        </Route>
        <Route exact path="/dev-genre">
          <GenreQuestionScreen
            question={questions[0]}
            onAnswerClick={() => null}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
