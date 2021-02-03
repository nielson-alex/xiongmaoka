import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import routes from './routes';
import { saveDecksToState, saveCardsToState } from './reducers/deckReducer' /* Reducer functions */
import { GET } from './helpers/API/service-calls';                          /* Service calls */
import './css/App.css';                                                     /* CSS */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  async componentDidMount() {
    if (this.props?.user?.id && this.props?.user?.id > -1) {
      await GET('/getDecksByUser', { creator: this.props.user.id })
        .then(decks => saveDecksToState(decks))
        .then(async () => await fetch('/getCardsByUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'creator': this.props.user.id
          }
        })
          .then(cards => {
            return cards.json()
          })
          .then(cards => {
            this.props.saveCardsToState(cards);
          }));
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          {routes}
        </header>
        <p>{this.state.apiResponse}</p>
        <ToastContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state?.userReducer?.user?.id && state?.userReducer?.user?.id > -1) {
    return {
      cards: state.deckReducer.cards,
      decks: state.deckReducer.decks,
      user: state.userReducer.user
    };
  }
}

export default connect(mapStateToProps, { saveCardsToState, saveDecksToState })(App);
