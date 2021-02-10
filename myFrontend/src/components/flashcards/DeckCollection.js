import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { saveCardsToState, saveDecksToState } from '../../reducers/deckReducer';        /* Reducer functions */
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs';   /* Functional components */
import { POST } from '../../helpers/API/service-calls';                                 /* Service calls */
import '../../css/App.css';                                                             /* CSS */

class DeckCollection extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            deleteWarningShow: false,
            deckToDelete: 0,
            showEdit: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };

        Modal.setAppElement('div');
    }

    componentDidMount = async () => {
        this._isMounted = true;
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this._isMounted = false;
    }

    updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight });
    handleDelete = e => this.setState({ deleteWarningShow: true, deckToDelete: e.target.id });
    handleConfirmDelete = async () => {
        POST('/deleteDeck', { deck_id: this.state.deckToDelete });

        await fetch('/getDecksByUser', {
            method: 'GET',
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
                    deleteWarningShow: false,
                });
            });
    }

    desktopRender = () => (
        <Content>
            <table className='table table-hover'>
                <tbody key='tbody'>
                    {this.props.decks.length > 0 ? this.props.decks.map(deck => (
                        <tr key={deck.deck_id}>
                            <td key={deck.deck_name}>
                                {deck.deck_name}
                            </td>
                            <td key={`review_${deck.deck_name}`}>
                                <Link kye={0} to={`/flashcards/deck${deck.deck_id}`}>
                                    Review</Link>
                            </td>
                            <td key={`edit_${deck.deck_name}`}>
                                <Link key={1} to={`/flashcards/edit-deck${deck.deck_id}`}>Edit</Link>
                            </td>
                            <td key={`delete_${deck.deck_name}`}>
                                <Link key={2} id={deck.deck_id} to='#' onClick={e => this.handleDelete(e)}>Delete</Link>
                            </td>
                        </tr>
                    )) : (<tr><td>No decks to show</td></tr>)}
                </tbody>
            </table>
        </Content>
    );

    mobileRender = () => (
        this.props.decks.length > 0 ? this.props.decks.map(deck => (
            <div key={deck.deck_id}>
                <Link to='/flashcards-dash'>&nbsp;Back</Link>
                <div className='row'>
                    <div className='col-9 middle-align card'>
                        <div className='row'>
                            <div className='col-12 deck-row'>
                                <h2>{deck.deck_name}</h2>
                            </div>
                        </div>
                        <div className='row'>
                            <Link className='btn btn-primary col-10 middle-align btn-lg' to={`/flashcards/deck${deck.deck_id}`}>
                                Review
                                </Link>
                        </div>
                        <br />
                        <div className='row'>
                            <Link className='btn btn-primary col-10 middle-align btn-lg' to={`/flashcards/edit-deck${deck.deck_id}`}>
                                Edit
                                </Link>
                        </div>
                        <br />
                        <div className='row'>
                            <Link className='btn btn-primary col-10 middle-align btn-lg' id={deck.deck_id} to='#' onClick={e => this.handleDelete(e)}>
                                Delete
                                </Link>
                        </div>
                        <br />
                        <br />
                    </div>
                </div>
                <br />
            </div>
        )) : (<>
            <h2>No decks to show</h2>
            <Link className='col-11 middle-align center-text' to='/flashcards-dash'>Back</Link>
        </>)
    );

    render() {
        let bOrM = this.state.width > 786 ? '-big' : '-mini';

        return (
            <div className='container-fluid spark--main-container backdrop full-height' style={{ overflowY: 'auto' }}>
                <PageHeader title='Collection' />

                {bOrM === '-big' ? (this.desktopRender()) : (this.mobileRender())}
                <Modal
                    isOpen={this.state.deleteWarningShow}
                    onHide={() => this.setState({ deleteWarningShow: false })}
                    style={{ width: '50vw', height: '50vh' }}>
                    <h2 className='center-text'>Are you sure you want to delete this deck?</h2>
                    <br />
                    <div className='row'>
                        <button className='btn btn-primary col-10 middle-align btn-lg btn-bad' onClick={() => this.setState({ deleteWarningShow: false })}>
                            Cancel</button>
                    </div>
                    <br />
                    <div className='row'>
                        <button className='btn btn-primary col-10 middle-align btn-lg btn-good' onClick={this.handleConfirmDelete}>Confirm</button>
                    </div>
                </Modal>
            </div>
        );
    };
}

const mapStateToProps = state => ({ user: state.userReducer.user, decks: state.deckReducer.decks });

export default connect(mapStateToProps, { saveCardsToState, saveDecksToState })(DeckCollection);