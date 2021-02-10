import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/panda-gray-eyes-02.png';
import { Content } from '../helpers/functional-components/GlobalSubs';          /* Functional components */
import { login } from '../reducers/userReducer';                                /* Reducer functions */
import { saveDecksToState, saveCardsToState } from '../reducers/deckReducer';
import { deleteState } from '../reducers/deckReducer';
import { generateMessage } from '../helpers/reusable-functions';                /* Helper functions */
import 'bootstrap/dist/css/bootstrap.css';                                      /* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.allFieldsValid = this.allFieldsValid.bind(this);
        this.state = {
            username: '',
            password: '',
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    componentDidMount = () => window.addEventListener('resize', this.updateWindowDimensions);
    componentWillUnmount = () => window.removeEventListener('resize', this.updateWindowDimensions);
    updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight });

    handleChange = e => this.setState({ [e.target.name]: e.target.value });
    handleKeyDown = e => e.key === 'Enter' ? this.handleSubmit(e) : null;
    handleClear = () => this.setState({ username: '', password: '' });

    handleSubmit = async e => {
        e.preventDefault();
        let userInfo = await fetch('/getUserInfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                username: this.state.username,
            }
        })
            .then(userInfo => {
                return userInfo.json()
            })
            .then(async userInfo => {
                await fetch('/getDecksByUser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'creator': userInfo.id
                    }
                })
                    .then(decks => {
                        return decks.json();
                    })
                    .then(decks => {
                        this.props.saveDecksToState(decks)
                    })
                    .then(async () =>
                        await fetch('/getCardsByUser', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8',
                                'creator': userInfo.id
                            }
                        })
                            .then(cards => {
                                return cards.json()
                            })
                            .then(cards => {
                                this.props.saveCardsToState(cards)
                            })
                    );

                return userInfo;
            });

        try {
            let usernamePasswordMatch = false;
            console.log(this.state.username);
            console.log(this.state.password);
            console.log(`db username: ${userInfo.username}`);
            console.log(`db password: ${userInfo.password}`);
            if (this.state.username === userInfo.username && this.state.password === userInfo.password) {
                this.props.login(userInfo);
            } else {
                generateMessage('error', 'Username or password is incorrect');
            }
        } catch (err) {
            console.log(err);
        }
    }

    allFieldsValid = () => {
        let allFieldsValid = true;

        if (this.state.username === '') {
            allFieldsValid = false;
            generateMessage('error', 'Please enter a username');
        }

        if (this.state.password === '') {
            allFieldsValid = false;
            generateMessage('error', 'Please enter a password');
        }

        return allFieldsValid;
    }

    render() {
        const bOrM = this.state.width > 768 ? '-big' : '-mini';
        if (this.props && this.props.user && this.props.user.loggedIn === true) return <Redirect to='/home' />;

        return bOrM === '-big' ? (
            <div className='container-fluid spark--main-container backdrop full-height'>
                <div className={`login-content-container${bOrM}`}>
                    <Content bOrM={bOrM}>
                        <img className='logo-big' src={logo} alt='logo' />
                        <h2 id='login-top-cont'>欢迎<br />Welcome!</h2>
                        <form className='form-horizontal'>
                            <div className='form-group'>
                                {/* <label htmlFor='tbUsername' className='col-sm-2 control-label'></label> */}
                                <div className='col-sm-12'>
                                    <input
                                        type='text'
                                        name='username'
                                        className='form-control'
                                        id='tbUsername'
                                        placeholder='Username'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor='tbUsername' className='col-sm-2 control-label'></label> */}
                                <div className='col-sm-12'>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        id='tbPassword'
                                        placeholder='Password'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='col-sm-offset-2 col-sm-10'>
                                    <button onClick={this.handleClear} className='btn btn-secondary login-clear'>Clear</button>
                                    <button onClick={this.handleSubmit} className='btn btn-primary login-submit'>Submit</button>
                                </div>
                            </div>

                        </form>
                        <div className='center-text emph-message'>
                            <p className='center-text'>Don't have an account?<br />Click <Link to='/signup'>here</Link> to create one.</p>
                        </div>
                    </Content>
                </div>
            </div>
        ) : (
                <div className='container-fluid spark--main-container backdrop full-height'>
                    <div className={`login-content-container${bOrM}`}>
                        <img className='logo-big' src={logo} alt='logo' />
                        <h2 id='login-top-cont'>欢迎<br />Welcome!</h2>
                        <form className='form-horizontal'>
                            <div className='form-group'>
                                {/* <label htmlFor='tbUsername' className='col-sm-2 control-label'></label> */}
                                <div className='col-sm-12'>
                                    <input
                                        type='text'
                                        name='username'
                                        className='form-control .input'
                                        id='tbUsername'
                                        placeholder='Username'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
                                {/* <label htmlFor='tbUsername' className='col-sm-2 control-label'></label> */}
                                <div className='col-sm-12'>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control .input'
                                        id='tbPassword'
                                        placeholder='Password'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>

                            <div className='row'>
                                <button onClick={this.handleSubmit} className='btn btn-primary login-submit col-10 middle-align'>Submit</button>
                            </div>
                            <br />
                            <div className='row'>
                                <button onClick={this.handleClear} className='btn btn-secondary  col-10 middle-align'>Clear</button>
                            </div>
                            <div className='row'>
                                <button onClick={this.props.deleteState} className='btn btn-secondary  col-10 middle-align'>Delete State</button>
                            </div>
                            <br />
                        </form>
                        <div className='center-text emph-message'>
                            <p className='center-text'>Don't have an account?<br />Click <Link to='/signup'>here</Link> to create one.</p>
                        </div>
                    </div>
                </div>
            )
    };
}

const mapStateToProps = state => ({ user: state.userReducer.user });

export default connect(mapStateToProps, { login, saveDecksToState, saveCardsToState, deleteState })(LogIn);