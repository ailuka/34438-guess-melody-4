import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/3/38/Stalker-Last_Laugh.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/44/Blues_en_F_-_tempo_60_%C3%A0_120.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/2/21/03_Turning_Points.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/2/2f/Dr_House.ogg`,
      genre: `rock`,
    }],
  },
  {
    type: `artist`,
    song: {
      artist: `Lorde`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/1`,
      artist: `Пелагея`,
    }, {
      picture: `https://api.adorable.io/avatars/128/2`,
      artist: `Краснознаменная дивизия имени моей бабушки`,
    }, {
      picture: `https://api.adorable.io/avatars/128/3`,
      artist: `Lorde`,
    }],
  }
];

describe(`Render App`, () => {
  it(`Render WelcomeScreen`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {questions},
      [NameSpace.GAME]: {
        mistakes: 0,
        step: -1,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App/>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {questions},
      [NameSpace.GAME]: {
        mistakes: 1,
        step: 0,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App/>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistQuestionScreen`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {questions},
      [NameSpace.GAME]: {
        mistakes: 2,
        step: 1,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App/>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render FailureScreen`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {questions},
      [NameSpace.GAME]: {
        mistakes: 3,
        step: 1,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App/>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render WinScreen`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {questions},
      [NameSpace.GAME]: {
        mistakes: 0,
        step: 3,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App/>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render AuthorizationScreen`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {questions},
      [NameSpace.GAME]: {
        mistakes: 0,
        step: 3,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App/>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
