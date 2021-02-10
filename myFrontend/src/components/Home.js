import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideNav, showNav } from '../reducers/visualsReducer';                      /* Reducer functions */
import { PageHeader, Content } from '../helpers/functional-components/GlobalSubs';  /* Functional components */
import '../css/App.css';                                                            /* CSS */

/* http://localhost:5001/getWeatherAmericanFork */
/* https://www.youtube.com/watch?v=HVdMhKN2ng4 */

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      navState: true,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({
      navState: this.props.navState
    }, () => {
      if (this.state.navState === false) {
        document.getElementById('universal-nav').style.display = 'none';
      } else {
        document.getElementById('universal-nav').style.display = 'block';
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight });

  toggleNav = () => {
    document.getElementById('universal-nav').style.display === 'block' ? this.props.hideNav() : this.props.showNav();
    this.setState({
      navState: !this.state.navState
    }, () => {
      if (this.state.navState === false) {
        document.getElementById('universal-nav').style.display = 'none';
      } else {
        document.getElementById('universal-nav').style.display = 'block';
      }
    });
  }

  render() {
    let bOrM = this.state.width > 768 ? '-big' : '-mini';

    return (
      <div className='container-fluid spark--main-container backdrop full-height' style={{ backgroundColor: 'rgba(121, 134, 172,0.1)' }}>
        <PageHeader title={`Welcome, ${this.props.user.firstName}!`} />
        {
          bOrM === '-big' ? (
            <Content>
              <button onClick={this.toggleNav}>Toggle Nav</button>
              <h2>
                <Link key={0} to='/flashcards-dash'>Getting Started</Link>
              </h2>
              <Link key={1} to='/dashboard'>
                <li key={0}>Equinox</li>
              </Link>
              <hr />
              <p>
                This app is geared towards people studying Mandarin Chinese but you can use the tools here to study any language!
              Before going to the flashcard <Link to='/flashcards-dash'>deck builder</Link>, please take the time to
              read this brief explanation below.
            </p>
              <br />
              <p>
                This app allows you to create digital decks of flashcards for language study. After choosing a name for your deck
                (e.g. 'Numbers') you can begin adding cards. Each card has three fields:</p>
              <br />

              <ul>
                <li key={0}>English</li>
                <li key={1}>Chinese</li>
                <li key={2}>Pinyin</li>
              </ul>

              <p>
                These fields are only a guideline though. Think of 'English' as your native language and 'Chinese' as the language you're studying.
                'Pinyin' is an optional field to provide a hint on the pronunciation of the word if you need it while quizzing yourself.
            </p>
            </Content>
          ) : (
              <div className='row'>
                <div className='col-1' />
                <div className='col-10'>
                  <h2 className='h2-section'>Getting Started</h2>
                  <hr />
                  <p>Welcome, and thanks for choosing <span style={{ fontWeight: 'bold' }}>熊猫学习</span>!
                You can navigate to any part of the site <span style={{ textDecoration: 'underline' }}>by clicking the panda icon at the top of your screen.</span></p>
                  <p>This app is geared towards people studying Mandarin Chinese but you can use the tools here to study any language!
              Before going to the flashcard <Link to='/flashcards-dash'>deck builder</Link>, please take the time to
              read this brief explanation below.</p>
                  <br />
                  <p>This app allows you to create digital decks of flashcards for language study. After choosing a name for your deck
                (e.g. 'Numbers') you can begin adding cards. Each card has three fields:</p>
                  <br />
                </div>
                <div className='row'>
                  <ul>
                    <li key={0}>English</li>
                    <li key={1}>Chinese</li>
                    <li key={2}>Pinyin</li>
                  </ul>
                </div>
                <div className='row'>
                  <p>These fields are only a guideline though. Think of 'English' as your native language and 'Chinese' as the language you're studying.
                'Pinyin' is an optional field to provide a hint on the pronunciation of the word if you need it while quizzing yourself.</p>

                  <br />
                  <h2 className='h2-section'>How It Works</h2>
                  <hr />
                  <p>You can create as many digital decks of flashcards as you want, each containing as many cards as
                  you want (though we recommend a max limit of 20). After decks have been created, you can go to your
                <Link to='/flashcards/deck-collection'>deck collection</Link> and choose to review
                cards, edit the deck, or delete the deck entirely. During quiz mode, you can choose for the cards to either display a Chinese word or phrase and be
                prompted to provide the English translation or display an English word or definition to translate into Chinese. In case there's a particular word
                whose definition is right on the edge of the your memory, there's an option to skip that card to be revisited later. There's also an option for
                you to see the pronunciation of the word in case you need to hint to push them in the right direction.</p>
                  <br />
                  <p>Each time a card has been answered correctly it tallies the number of correct answers. Answering incorrectly doesn't count against you, it simply
                  won't increase the number of total correct answers. Once a card has been answered correctly five times, it will be removed from the deck until
                there are no more cards remaining.</p>
                </div>
                <div className='col-1' />
              </div>
            )
        }
      </div >
    );
  };
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  navState: state.visualsReducer.navVisible
});

export default connect(mapStateToProps, { hideNav, showNav })(Home);
