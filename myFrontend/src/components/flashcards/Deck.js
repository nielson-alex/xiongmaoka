import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs';   /* Functional components */
import { generateMessage } from '../../helpers/reusable-functions';                     /* Helper functions */
import '../../css/App.css';                                                             /* CSS */

class Deck extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleStartTest = this.handleStartTest.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getRandom = this.getRandom.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleShowHint = this.handleShowHint.bind(this);
        this.state = {
            answer: '',
            cards: [{
                id: 0,
                deck_id: 0,
                card_num: 0,
                english: '',
                chinese: '',
                pinyin: '',
                numCorrect: 0
            }],
            currentCard: 0,
            cycles: 3,
            deckName: '',
            masteredCards: '',
            showModal: false,
            showHint: false,
            status: '',
            testMode: '',
            width: window.innerWidth,
            height: window.innerHeight
        };

        Modal.setAppElement('div');
    }

    async componentDidMount() {
        this._isMounted = true;
        window.addEventListener('resize', this.updateWindowDimensions);

        let id = parseInt(this.props.match.params.id, 10);
        let idx = this.props.decks.map(deck => deck.deck_id).indexOf(id);
        let deckName = this.props.decks[idx].deck_name;
        let cards = [];

        for (let i = 0; i < this.props.cards.length; i++) {
            if (this.props.cards[i].deck_id === parseInt(this.props.match.params.id, 10)) {
                cards.push({
                    id: this.props.cards[i].id,
                    deck_id: this.props.cards[i].deck_id,
                    card_num: this.props.cards[i].card_num,
                    english: this.props.cards[i].english,
                    chinese: this.props.cards[i].chinese,
                    pinyin: this.props.cards[i].pinyin,
                    numCorrect: 0
                });
            }
        }

        cards.sort((a, b) => a.card_num > b.card_num ? 1 : -1);

        if (this._isMounted === true) {
            this.setState({
                deckName: deckName,
                cards: cards
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this._isMounted = false;
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    openModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    closeModal() {
        this.setState({
            cards: this.props.cards,
            showModal: !this.state.showModal
        });
    }

    handleStartTest(e) {
        if (this.state.cycles < 1) {
            generateMessage('error', 'Review session duration requires each card be correctly answered at least 1 time');
        } else if (this.state.cycles > 10) {
            generateMessage('error', 'Please provide a number lower than 10');
        } else {
            this.openModal();

            this.setState({
                answer: '',
                currentCard: this.getRandom(),
                [e.target.name]: e.target.value
            });
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleSubmitAnswer();
        }
    }

    handleSubmitAnswer() {
        let cards = [];
        let modifiedCards = [];
        const testLang = this.state.testMode === 'enToZh' ? 'chinese' : 'english';

        if (this.state.answer.toLowerCase() === this.state.cards[this.state.currentCard][testLang].toLowerCase()) {
            for (let i = 0; i < this.state.cards.length; i++) {
                cards.push({
                    id: this.state.cards[i].id,
                    deck_id: this.state.cards[i].deck_id,
                    card_num: this.state.cards[i].card_num,
                    english: this.state.cards[i].english,
                    chinese: this.state.cards[i].chinese,
                    pinyin: this.state.cards[i].pinyin,
                    numCorrect: i === this.state.currentCard ? this.state.cards[i].numCorrect + 1 : this.state.cards[i].numCorrect
                });
            }

            for (let i = 0; i < cards.length; i++) {
                if (cards[i].numCorrect < this.state.cycles) {
                    modifiedCards.push(cards[i]);
                }
            }

            cards = modifiedCards;

            if (cards.length === 0) {
                this.setState({
                    answer: '',
                    status: 'Complete!',
                    showModal: !this.state.showModal
                });
                generateMessage('success', `Congratulations! You've mastered all the cards in the ${this.state.deckName} deck.`);

                this.props.history.push('/flashcards/deck-collection');
            } else {
                this.setState({
                    answer: '',
                    cards: cards,
                    status: 'Correct!',
                    showHint: false
                }, () => {
                    this.setState({
                        currentCard: this.getRandom()
                    });
                });
            }
        } else {
            this.setState({
                answer: '',
                status: 'Incorrect',
                currentCard: this.getRandom()
            });
        }
    }

    handleSkip() {
        this.setState({
            answer: '',
            currentCard: this.getRandom(),
            showHint: false
        });
    }

    getRandom() {
        let rand = Math.floor(Math.random() * ((this.state.cards.length - 1) - 0)) + 0;

        if (rand === this.state.currentCard) {
            rand = Math.floor(Math.random() * ((this.state.cards.length - 1) - 0)) + 0;
        }

        return rand;
    }

    async handleReset() {
        let id = parseInt(this.props.match.params.id, 10);
        let idx = this.props.decks.map(deck => deck.deck_id).indexOf(id);
        let deckName = this.props.decks[idx].deck_name;
        let cards = [];

        for (let i = 0; i < this.props.cards.length; i++) {
            if (this.props.cards[i].deck_id === parseInt(this.props.match.params.id, 10)) {
                cards.push({
                    id: this.props.cards[i].id,
                    deck_id: this.props.cards[i].deck_id,
                    card_num: this.props.cards[i].card_num,
                    english: this.props.cards[i].english,
                    chinese: this.props.cards[i].chinese,
                    pinyin: this.props.cards[i].pinyin,
                    numCorrect: 0
                });
            }
        }

        cards.sort((a, b) => a.card_num > b.card_num ? 1 : -1);

        if (this._isMounted === true) {
            this.setState({
                deckName: deckName,
                cards: cards,
                showModal: false
            });
        }
    }

    handleShowHint() {
        this.setState({
            showHint: !this.state.showHint
        });
    }

    render() {
        let bOrM = this.state.width > 768 ? '-big' : '-mini';
        let word = '';

        if (this.state.cards.length > 0) {
            if (this.state.testMode === 'enToZh') {
                console.log(this.state.cards);
                console.log(this.state.currentCard);
                word = this.state.cards[this.state.currentCard].english
            } else if (this.state.testMode === 'zhToEn') {
                word = this.state.cards[this.state.currentCard].chinese
            }
        }

        return (<div className='container-fluid spark--main-container backdrop full-height'>
            <PageHeader title='Review' />

            {bOrM === '-big' ? (
                <Content>
                    <Link to='/flashcards/deck-collection'>Back</Link>
                    <label htmlFor='tbCycles'>
                        End review session after each question is answered correctly&nbsp;&nbsp;
                    </label>
                    <input type='number' id='tbCycles' value={this.state.cycles} onChange={e => this.setState({
                        cycles: parseInt(e.target.value, 10)
                    })} />
                    <label htmlFor='tbCycles'>&nbsp;&nbsp;{this.state.cycles === 1 ? 'time' : 'times'}.</label>
                    <h2>{this.state.deckName}</h2>
                    <div className='row'>
                        <button
                            name='testMode'
                            className='btn btn-primary col-10 middle-align btn-lg'
                            value='enToZh'
                            onClick={e => this.handleStartTest(e)}>
                            Test English to Chinese</button>
                    </div>
                    <br />
                    <br />
                    <div className='row'>
                        <button
                            name='testMode'
                            className='btn btn-primary col-10 middle-align btn-lg'
                            value='zhToEn'
                            onClick={e => this.handleStartTest(e)}>
                            Test Chinese to English</button>
                    </div>

                    <Modal closeButton isOpen={this.state.showModal} onHide={this.closeModal}>
                        <div style={{
                            backgroundColor: 'rgba(46,204,64,0.25)',
                            color: '#494f52',
                            padding: '0 0 0.5em 0'
                        }}>
                            <button onClick={this.handleReset} style={{
                                backgroundColor: 'RGBA(0,0,0,0.0)',
                                border: 'none',
                                fontSize: '40px',
                                position: 'fixed',
                                top: '-0.4em',
                                right: '0.5em'
                            }}>&times;</button>
                            <br />
                            <h3 className='center-text'>{this.state.cards.length > 0 ? `Card #${this.state.cards[this.state.currentCard].card_num}` : ''}</h3>
                            <h2 className='center-text'>{word}</h2>
                        </div>
                        <br />
                        <div className='row'>
                            <h4 className='col-9 middle-align' style={{ fontSize: '12px' }}>
                                {this.state.cards.length > 0 ? `Times answered correctly: ${this.state.cards[this.state.currentCard].numCorrect}` : ''}
                            </h4>
                            <input
                                type='text'
                                name='answer'
                                className='col-9 middle-align'
                                onChange={e => this.setState({ [e.target.name]: e.target.value })}
                                onKeyDown={e => this.handleKeyDown(e)}
                                value={this.state.answer} />
                        </div>
                        <hr />
                        <div className='row'>
                            <button className='btn btn-primary col-10 middle-align btn-lg' onClick={this.handleSubmitAnswer}>Submit</button>
                        </div>
                        <br />
                        <div className='row'>
                            <button className='btn btn-primary col-10 middle-align btn-lg' onClick={this.handleSkip}>Skip</button>
                        </div>
                        <br />
                        <div className='row'>
                            <button className='btn btn-primary col-10 middle-align btn-lg' onClick={this.handleShowHint}>
                                {this.state.showHint !== true ? 'Show Hint' : 'Hide Hint'}</button>
                        </div>
                        <br />
                        {this.state.showHint === true ? (
                            <h4 style={{ textAlign: 'center' }}>
                                {this.state.cards[this.state.currentCard].pinyin}
                            </h4>
                        ) : (
                                <></>
                            )}
                        <h4>{this.state.status}</h4>

                    </Modal>
                </Content>) : (
                    <>
                        <Link to='/flashcards/deck-collection'>Back</Link>
                        <h2>{this.state.deckName}</h2>
                        <div className='row'>
                            <button
                                name='testMode'
                                className='btn btn-primary col-10 middle-align btn-lg'
                                value='enToZh'
                                onClick={e => this.handleStartTest(e)}>
                                Test English to Chinese</button>
                        </div>
                        <br />
                        <br />
                        <div className='row'>
                            <button
                                name='testMode'
                                className='btn btn-primary col-10 middle-align btn-lg'
                                value='zhToEn'
                                onClick={e => this.handleStartTest(e)}>
                                Test Chinese to English</button>
                        </div>

                        {this.state.showModal === true ? (
                            <div className="form-horizontal" style={{ position: 'absolute', backgroundColor: 'white', height: '100vh', width: '100vw', top: '0', zIndex: '999' }}>
                                <div style={{
                                    backgroundColor: 'rgba(46,204,64,0.25)',
                                    color: '#494f52',
                                    padding: '0 0 0.5em 0'
                                }}>
                                    <button onClick={this.handleReset} style={{
                                        backgroundColor: 'RGBA(0,0,0,0.0)',
                                        border: 'none',
                                        fontSize: '40px',
                                        position: 'fixed',
                                        top: '-0.4em',
                                        right: '0.5em'
                                    }}>&times;</button>
                                    <br />
                                    <h3 className='center-text'>{this.state.cards.length > 0 ? `Card #${this.state.cards[this.state.currentCard].card_num}` : ''}</h3>
                                    <h2 className='center-text'>{word}</h2>
                                </div>
                                <br />
                                <div className='row'>
                                    <h4 className='col-9 middle-align' style={{ fontSize: '12px' }}>
                                        {this.state.cards.length > 0 ? `Times answered correctly: ${this.state.cards[this.state.currentCard].numCorrect}` : ''}
                                    </h4>
                                    <input
                                        type='text'
                                        name='answer'
                                        className='col-9 middle-align'
                                        onChange={e => this.setState({ [e.target.name]: e.target.value })}
                                        onKeyDown={e => this.handleKeyDown(e)}
                                        value={this.state.answer} />
                                </div>
                                <hr />
                                <div className='row'>
                                    <button className='btn btn-primary col-10 middle-align btn-lg' onClick={this.handleSubmitAnswer}>Submit</button>
                                </div>
                                <br />
                                <div className='row'>
                                    <button className='btn btn-primary col-10 middle-align btn-lg' onClick={this.handleSkip}>Skip</button>
                                </div>
                                <br />
                                <div className='row'>
                                    <button className='btn btn-primary col-10 middle-align btn-lg' onClick={this.handleShowHint}>
                                        {this.state.showHint !== true ? 'Show Hint' : 'Hide Hint'}</button>
                                </div>
                                <br />
                                {this.state.showHint === true ? (
                                    <h4 style={{ textAlign: 'center' }}>
                                        {this.state.cards[this.state.currentCard].pinyin}
                                    </h4>
                                ) : (
                                        <></>
                                    )}
                                <h4>{this.state.status}</h4>
                            </div>) : (
                                <></>
                            )}
                    </>
                )
            }
        </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        cards: state.deckReducer.cards,
        decks: state.deckReducer.decks
    };
}

export default connect(mapStateToProps)(Deck);