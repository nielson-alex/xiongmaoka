import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs';   /* Functional components */
import { saveCardsToState, saveDecksToState } from '../../reducers/deckReducer';        /* Reducer functions */
import { generateMessage } from '../../helpers/reusable-functions';                     /* Helper functions */
import { POST } from '../../helpers/API/service-calls';                                 /* Service calls */
import '../../css/App.css';                                                             /* CSS */

class FlashcardsDash extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            english: '',
            chinese: '',
            pinyin: '',
            cardNum: 1,
            deckNameDisabled: false,
            deck: {
                num: 1,
                name: ''
            },
            createdCards: [],
            existingDecks: [],
            readyToAddCards: false,
            showModal: false,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount = async () => {
        this._isMounted = true;
        window.addEventListener('resize', this.updateWindowDimensions);

        this.setState({
            existingDecks: this.props.decks
        });
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this._isMounted = false;
    }

    updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight });

    createDeck = async () => {
        let decks = [];
        if (this.state.deck.name === '' || this.state.deck.name === undefined) {
            generateMessage('error', 'Please provide a name for the deck before adding cards');
        } else {
            let deckNameTaken = false;
            this.state.existingDecks.forEach(deck => {
                if (deck.deck_name.toLowerCase() === this.state.deck.name.toLowerCase()) {
                    deckNameTaken = true;
                    generateMessage('error', 'A deck with this name already exists');
                }
            })

            if (deckNameTaken === false) {
                fetch('/createDeck', {
                    method: 'POST',
                    body: JSON.stringify({
                        creator: this.props.user.id,
                        deckName: this.state.deck.name.replace(/[./#!$%^&*;:{}=_`~]/g, "")
                    }),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                });

                decks = await fetch('/getDecksByUser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'creator': this.props.user.id
                    }
                })
                    .then(decks => decks.json())
                    .then(decks => this.props.saveDecksToState(decks));

                await fetch('/getLatestDeckID', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
                    .then(deck => deck.json())
                    .then(deck => {
                        this.setState({
                            deckNameDisabled: true,
                            deckNum: deck.deck_id,
                            readyToAddCards: true
                        }, () => {
                            document.getElementById('tbEnglish').select();
                        });
                    });
            }
        }
    }

    addCardToDeck = async () => {
        if (this.cardFieldsValid() === true) {
            let createdCard = {
                creator: this.props.user.id,
                deckID: this.state.deckNum,
                cardNum: this.state.cardNum,
                english: this.state.english.replace(/[./#!$%^&*;:{}=_`~]/g, ""),
                chinese: this.state.chinese.replace(/[./#!$%^&*;:{}=_`~]/g, ""),
                pinyin: this.state.pinyin.replace(/[./#!$%^&*;:{}=_`~]/g, "")
            }

            let createdCards = this.state.createdCards;
            createdCards.push(createdCard);

            POST('/addCard', createdCard);

            await fetch('/getDecksByUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'creator': this.props.user.id
                }
            })
                .then(decks => {
                    return decks.json();
                })
                .then(decks => {
                    this.props.saveDecksToState(decks);
                });

            await fetch('/getCardsByUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'creator': this.props.user.id
                }
            })
                .then(cards => {
                    return cards.json();
                })
                .then(cards => {
                    this.props.saveCardsToState(cards);
                    this.setState({
                        english: '',
                        chinese: '',
                        pinyin: '',
                        cardNum: this.state.cardNum + 1,
                        createdCards: createdCards
                    }, () => {
                        document.getElementById('tbEnglish').select();
                    });
                });
        }
    };

    cardFieldsValid = () => {
        let fieldsValid = true;

        if (this.state.english === '') {
            generateMessage('error', 'Cards must have an English definition');
            fieldsValid = false;
        } else if (this.state.english.length > 100) {
            generateMessage('error', 'Words and phrases cannot exceed 100 character');
            fieldsValid = false;
        }

        if (this.state.chinese === '') {
            generateMessage('error', 'Cards must have a Chinese definition');
            fieldsValid = false;
        } else if (this.state.chinese.length > 100) {
            generateMessage('error', 'Words and phrases cannot exceed 100 character');
            fieldsValid = false;
        }

        if (this.state.pinyin !== '') {
            if (this.state.pinyin.length > 101) {
                generateMessage('error', 'Words and phrases cannot exceed 100 character');
                fieldsValid = false;
            }
        }

        return fieldsValid;
    }

    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

    clear = () =>
        this.setState({
            deckNameDisabled: false,
            deck: {
                name: ''
            },
            english: '',
            chinese: '',
            pinyin: '',
            createdCards: [],
            readyToAddCards: false,
            showModal: false
        });

    delete = () =>
        this.setState({
            english: '',
            chinese: '',
            pinyin: '',
            cardCount: 0,
            deck: {
                name: '',
                cards: []
            },
        });

    markPinyin = e => {
        let pinyin = e.target.value
        pinyin = pinyin.replace("a1", "ā");
        pinyin = pinyin.replace("a2", "á");
        pinyin = pinyin.replace("a3", "ǎ");
        pinyin = pinyin.replace("a4", "à");
        pinyin = pinyin.replace("e1", "ē");
        pinyin = pinyin.replace("e2", "é");
        pinyin = pinyin.replace("e3", "ě");
        pinyin = pinyin.replace("e4", "è");
        pinyin = pinyin.replace("i1", "ī");
        pinyin = pinyin.replace("i2", "í");
        pinyin = pinyin.replace("i3", "ǐ");
        pinyin = pinyin.replace("i4", "ì");
        pinyin = pinyin.replace('o1', 'ō');
        pinyin = pinyin.replace('o2', 'ó');
        pinyin = pinyin.replace('o3', 'ǒ');
        pinyin = pinyin.replace('o4', 'ò');
        pinyin = pinyin.replace('u1', 'ū');
        pinyin = pinyin.replace('u2', 'ú');
        pinyin = pinyin.replace('u3', 'ǔ');
        pinyin = pinyin.replace('u4', 'ù');
        pinyin = pinyin.replace('v1', 'ǖ');
        pinyin = pinyin.replace('v2', 'ǘ');
        pinyin = pinyin.replace('v3', 'ǚ');
        pinyin = pinyin.replace('v4', 'ǜ');
        pinyin = pinyin.replace('v5', 'ü');

        this.setState({ pinyin: pinyin })
    }

    render() {
        let bOrM = this.state.width > 768 ? '-big' : '-mini';

        return (
            <div className={`container-fluid spark--main-container backdrop full-height${bOrM}`}>
                {/* Deck Builder */}
                {this.state.showModal === true ? (
                    <div className="form-horizontal" style={{ position: 'absolute', backgroundColor: 'white', height: '90vh', width: '90vw', left: '5vw', zIndex: '999' }}>
                        <button onClick={this.clear} style={{ border: 'none', backgroundColor: 'RGBA(0,0,0,0.0)', fontSize: '40px' }}>&times;</button>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <h2>Deck Name</h2>
                                <input
                                    type='text'
                                    className='col-11 middle-align'
                                    placeholder='Deck Name'
                                    value={this.state.deck.name}
                                    onChange={e => this.setState({
                                        deck: {
                                            num: this.state.deck.num,
                                            name: e.target.value,
                                        }
                                    })}
                                    onKeyDown={e => e.key === 'Enter' ? this.createDeck() : null}
                                    disabled={this.state.deckNameDisabled === true ? 'disabled' : ''} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button
                                    className='col-9 middle-align btn-primary btn-lg'
                                    disabled={this.state.readyToAddCards === true ? 'disabled' : ''}
                                    onClick={() => this.createDeck()}>
                                    Start Adding Cards
                            </button>
                            </div>
                        </div>
                        {this.state.readyToAddCards === true ? (
                            <>
                                <div className="form-group">
                                    <h2>Card {this.state.cardNum}</h2>
                                    <div className="col-sm-12">
                                        <input
                                            id='tbEnglish'
                                            type='text'
                                            className='col-11 middle-align'
                                            placeholder='English'
                                            value={this.state.english}
                                            onChange={e => this.setState({ english: e.target.value })}
                                            onKeyDown={e => e.key === 'Enter' ? this.addCardToDeck() : null} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input
                                            type='text'
                                            className='col-11 middle-align'
                                            placeholder='中文'
                                            value={this.state.chinese}
                                            onChange={e => this.setState({ chinese: e.target.value })}
                                            onKeyDown={e => e.key === 'Enter' ? this.addCardToDeck() : null} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input
                                            type='text'
                                            className='col-11 middle-align'
                                            placeholder='Pīnyīn'
                                            value={this.state.pinyin}
                                            onChange={e => this.markPinyin(e)}
                                            onKeyDown={e => { this.markPinyin(e); if (e.key === 'Enter') { this.addCardToDeck(); } }} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className='btn-primary col-9 middle-align btn-lg' onClick={this.addCardToDeck}>Add Card to Deck</button>

                                    </div>
                                    <div>
                                        <ol>
                                            {this.state.createdCards.length > 0 ?
                                                this.state.createdCards.map(card => (
                                                    <li key={card.cardNum}>deck_id: {card.deckID}, card number: {card.cardNum} | {card.english} ({card.chinese})</li>)
                                                ) :
                                                <></>
                                            }
                                        </ol>
                                    </div>
                                    <button className='btn-secondary col-9 middle-align btn-lg' onClick={this.clear}>Done</button>
                                </div>
                            </>) : (<></>)
                        }
                    </div>) : (
                        <></>
                    )
                }

                <PageHeader title='Dashboard' />
                {bOrM === '-big' ? (
                    <Content>
                        <table className='table table-hover'>
                            <tbody>
                                <tr>
                                    <td>
                                        <Link to='#' key={0} onClick={() => this.setState({ showModal: true })}>
                                            Create Deck</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link key={1} to='/flashcards/deck-collection'>Deck Collection</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Content>
                ) : (
                        <>
                            <br />
                            <div className='row'>
                                <button className='btn-primary col-10 middle-align btn-lg' onClick={() => this.setState({ showModal: true })}>
                                    Create New Deck
                                </button>
                            </div>
                            <br />
                            <br />

                            <Link key={0} to='/flashcards/deck-collection' className='row'>
                                <button className='btn-primary col-10 middle-align btn-lg'>{this.props.user.firstName}'s Deck Collection</button>
                            </Link>
                        </>
                    )
                }
            </div>
        );
    };
}

const mapStateToProps = state => ({ decks: state.deckReducer.decks, user: state.userReducer.user });

export default connect(mapStateToProps, { saveCardsToState, saveDecksToState })(FlashcardsDash);