import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveCardsToState, saveDecksToState } from '../../reducers/deckReducer';        /* Reducer functions */
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs';   /* Functional components */
import { generateMessage } from '../../helpers/reusable-functions';                     /* Helper functions */
import { POST } from '../../helpers/API/service-calls';                                 /* Service calls */
import '../../css/App.css';                                                             /* CSS */

class EditDeck extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleUpdateDeckName = this.handleUpdateDeckName.bind(this);
        this.cardFieldsValid = this.cardFieldsValid.bind(this);
        this.state = {
            cards: [],
            deckName: '',
            selectedCard: {
                deck_id: -1,
                id: -1,
                card_num: -1,
                english: '',
                chinese: '',
                pinyin: ''
            },
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('resize', this.updateWindowDimensions);

        let cards = [];
        let deckIdx = this.props.decks.map(deck => deck.deck_id).indexOf(parseInt(this.props.match.params.id, 10));

        this.props.cards.forEach(card => {
            if (card.deck_id === parseInt(this.props.match.params.id, 10)) {
                cards.push({
                    deck_id: card.deck_id,
                    id: card.id,
                    card_num: card.card_num,
                    english: card.english,
                    chinese: card.chinese,
                    pinyin: card.pinyin
                });
            }
        });

        if (this._isMounted === true) {
            this.setState({
                cards: cards.sort((a, b) => a.id > b.id ? 1 : - 1),
                deckName: this.props.decks[deckIdx].deck_name
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this._isMounted = false;
    }

    updateWindowDimensions() {
        this.setState({
            query: {},
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    handleChange(e) {
        let idIndex = e.target.id.indexOf('-');
        let id = parseInt(e.target.id.substr(0, idIndex), 10);
        let cardIndex = this.props.cards.map(card => card.id).indexOf(id);
        let card = this.props.cards[cardIndex];

        this.setState({
            selectedCard: {
                ...this.state.selectedCard,
                id: card.id,
                deck_id: card.deck_id,
                card_num: card.card_num,
                [e.target.name]: e.target.name === 'pinyin' ? this.handlePinyin(e.target.value) : e.target.value
            }
        });
    }

    handleBlur(e) {
        if (this.state.selectedCard.id > 0) {
            let value = this.state.selectedCard[e.target.name];

            if (value !== '') {
                this.setState({
                    selectedCard: {
                        ...this.state.selectedCard,
                        [e.target.name]: value,
                    }
                }, () => {
                    let id = this.state.selectedCard.id;
                    let idx = this.props.cards.map(card => card.id).indexOf(id);
                    let originCard = this.props.cards[idx];
                    this.props.cards[idx] = this.state.selectedCard;
                    console.log(originCard);
                    if (value !== '') {
                        POST('/editCard', {
                            deck_id: this.state.selectedCard.deck_id,
                            card_id: this.state.selectedCard.id,
                            english: this.state.selectedCard.english !== '' ?
                                this.state.selectedCard.english.replace(/[./#!$%^&*;:{}=_`~]/g, "") :
                                originCard.english,
                            chinese: this.state.selectedCard.chinese !== '' ?
                                this.state.selectedCard.chinese.replace(/[./#!$%^&*;:{}=_`~]/g, "") :
                                originCard.chinese,
                            pinyin: this.state.selectedCard.pinyin !== '' ?
                                this.state.selectedCard.pinyin.replace(/[./#!$%^&*;:{}=_`~]/g, "") :
                                originCard.pinyin
                        })
                        console.log(document.getElementById(`${this.state.selectedCard.id}-english`).placeholder);
                        this.setState({
                            selectedCard: {
                                ...this.state.selectedCard,
                                english: this.state.selectedCard.english !== '' ?
                                    this.state.selectedCard.english.replace(/[./#!$%^&*;:{}=_`~]/g, "") :
                                    document.getElementById(`${this.state.selectedCard.id}-english`).placeholder,
                                chinese: this.state.selectedCard.chinese !== '' ?
                                    this.state.selectedCard.chinese.replace(/[./#!$%^&*;:{}=_`~]/g, "") :
                                    document.getElementById(`${this.state.selectedCard.id}-chinese`).placeholder,
                                pinyin: this.state.selectedCard.pinyin !== '' ?
                                    this.state.selectedCard.pinyin.replace(/[./#!$%^&*;:{}=_`~]/g, "") :
                                    document.getElementById(`${this.state.selectedCard.id}-pinyin`).placeholder
                            }
                        }, () => {
                            this.props.cards[idx] = this.state.selectedCard
                        })

                    }
                });
            }
        }
    }

    handleUpdateDeckName(e) {
        if (e.target.value !== '') {
            POST('/updateDeckName', {
                deck_id: parseInt(this.props.match.params.id, 10),
                deck_name: e.target.value.replace(/[./#!$%^&*;:{}=_`~]/g, ""),
            });

            let idx = this.props.decks.map(deck => deck.deck_id).indexOf(parseInt(this.props.match.params.id, 10));
            this.props.decks[idx].deck_name = e.target.value;
            console.log(this.props.decks[idx]);
        }
    }

    cardFieldsValid() {
        let fieldsValid = true;

        if (this.state.english) {
            if (this.state.english === '') {
                generateMessage('error', 'Cards must have an English definition');
                fieldsValid = false;
            } else if (this.state.english.length > 100) {
                generateMessage('error', 'Words and phrases cannot exceed 100 character');
                fieldsValid = false;
            }
        }

        if (this.state.chinese) {
            if (this.state.chinese === '') {
                generateMessage('error', 'Cards must have a Chinese definition');
                fieldsValid = false;
            } else if (this.state.chinese.length > 100) {
                generateMessage('error', 'Words and phrases cannot exceed 100 character');
                fieldsValid = false;
            }
        }

        if (this.state.pinyin) {
            if (this.state.pinyin !== '') {
                if (this.state.pinyin.length > 101) {
                    generateMessage('error', 'Words and phrases cannot exceed 100 character');
                    fieldsValid = false;
                }
            }
        }

        return fieldsValid;
    }

    handlePinyin(val) {
        let pinyin = val
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

        val = pinyin;
        return val;
    }

    render() {
        return (
            <>
                <div className='container-fluid spark--main-container backdrop full-height' style={{ overflowY: 'auto' }}>
                    <PageHeader title='Edit Deck' />
                    <Link to='/flashcards/deck-collection'>Back</Link>

                    <Content>
                        <hr />
                        <input type='text' placeholder={this.state.deckName} onChange={() => console.log('no')} onBlur={e => this.handleUpdateDeckName(e)} />
                        {this.state.cards.map(card => {
                            return (
                                <div key={`card-${card.id}`} style={{ width: '80%' }} className='middle-align'>

                                    <div className='row'>
                                        <div className='col-12'>
                                            <h2>Card {card.card_num}</h2>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <input
                                                id={`${card.id}-english`}
                                                type='text'
                                                name='english'
                                                placeholder={card.english}
                                                onBlur={e => this.handleBlur(e)}
                                                onChange={e => this.handleChange(e)}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <div className='col-12'>
                                            <input
                                                id={`${card.id}-chinese`}
                                                type='text'
                                                name='chinese'
                                                placeholder={card.chinese}
                                                onBlur={e => this.handleBlur(e)}
                                                onChange={e => this.handleChange(e)}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <div className='col-12'>
                                            <input
                                                id={`${card.id}-pinyin`}
                                                type='text'
                                                name='pinyin'
                                                placeholder={card.pinyin}
                                                onBlur={e => this.handleBlur(e)}
                                                onChange={e => this.handleChange(e)}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <hr />
                                </div>
                            )
                        })}
                    </Content>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.deckReducer.cards,
        decks: state.deckReducer.decks,
        user: state.userReducer.user
    };
}

export default connect(mapStateToProps, { saveCardsToState, saveDecksToState })(EditDeck);