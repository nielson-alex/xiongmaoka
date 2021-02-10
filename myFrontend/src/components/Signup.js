import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/panda-gray-eyes-02.png';
import { Content } from '../helpers/functional-components/GlobalSubs';  /* Functional components */
import { signup } from '../reducers/userReducer';                                   /* Reducer functions */
import { generateMessage } from '../helpers/reusable-functions';                    /* Helper functions */
import '../css/App.css';                                                            /* CSS */

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount = () => window.addEventListener('resize', this.updateWindowDimensions);
    componentWillUnmount = () => window.removeEventListener('resize', this.updateWindowDimensions);
    updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight });
    handleChange = e => this.setState({ [e.target.name]: e.target.value });
    handleKeyDown = e => e.key === 'Enter' ? this.handleSubmit() : null;

    handleClear = () =>
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        });

    handleSubmit = async (e) => {
        console.log('entered handle submit');

        if (this.fieldsAreValid() === true) {
            if (await this.emailTaken() === false) {
                if (await this.usernameTaken() === false) {
                    fetch('/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify({
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            username: this.state.username,
                            email: this.state.email,
                            password: this.state.password
                        })
                    });

                    generateMessage('success', 'Account successfully created!');
                    this.props.history.push('/');
                } else {
                    generateMessage('error', 'This username is already in use');
                }
            } else {
                generateMessage('error', 'This email is already in use');
            }
        }
    }

    emailTaken = async () => {
        let emailTaken = false;

        await fetch('/getEmails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then(takenEmails => {
                return takenEmails.json();
            })
            .then(takenEmails => {
                console.log(takenEmails);
                return takenEmails.map(entry => entry['email']);
            })
            .then(takenEmails => {
                console.log(takenEmails);

                if (takenEmails.includes(this.state.email)) {
                    emailTaken = true;
                }
            });

        return emailTaken;
    }

    usernameTaken = async () => {
        let usernameTaken = false;
        await fetch('/getUsernames', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then(usernames => {
                return usernames.json()
            })
            .then(usernames => {
                return usernames.map(entry => entry['username']);
            })
            .then(usernames => {
                if (usernames.includes(this.state.username)) {
                    usernameTaken = true;
                }
            });

        return usernameTaken;
    }

    fieldsAreValid = () => {
        let allFieldsValid = true;

        if (this.state.firstName === '') {
            generateMessage('error', 'Please enter a first name');
            allFieldsValid = false;
        }

        if (this.state.lastName === '') {
            generateMessage('error', 'Please enter a last name');
            allFieldsValid = false;
        }

        if (this.state.email === '') {

            generateMessage('error', 'Please enter an email');
            allFieldsValid = false;
        } else {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
                generateMessage('error', 'Email is invalid format');
                allFieldsValid = false;
            }
        }

        if (this.state.username === '') {
            generateMessage('error', 'Please enter a username');
            allFieldsValid = false;
        }

        if (this.state.password === '') {
            generateMessage('error', 'Please enter a password');
            allFieldsValid = false;
        }

        return allFieldsValid;
    }

    render() {
        if (this.props && this.props.user && this.props.user.loggedIn === true) {
            return <Redirect to='/home' />
        }

        let bOrM = this.state.width > 768 ? '-big' : '-mini';

        return bOrM === '-big' ? (
            <div className='container-fluid spark--main-container backdrop full-height' style={{ height: '100vh' }}>
                <div className='login-content-container'>
                    <Content bOrM={bOrM}>
                        <Link to='/'>Back</Link>
                        <img className='logo-big' src={logo} alt='logo' />
                        <h2 id='login-top-cont'>Create Account</h2>

                        <div className='form-horizontal'>
                            <div className='form-group'>
                                <div className='col-sm-12'>
                                    <input
                                        type='text'
                                        name='firstName'
                                        className='form-control'
                                        id='tbFirstName'
                                        placeholder='First Name'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='col-sm-12'>
                                    <input
                                        type='text'
                                        name='lastName'
                                        className='form-control'
                                        id='tbLastName'
                                        placeholder='Last Name'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='col-sm-12'>
                                    <input
                                        type='email'
                                        name='email'
                                        className='form-control'
                                        id='tbEmail'
                                        placeholder='Email'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
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
                                    <button onClick={(e) => this.handleSubmit(e)} className='btn btn-primary login-submit'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </Content>
                </div>
            </div>
        ) : (
                <div className='container-fluid spark--main-container backdrop full-height' style={{ height: '100vh' }}>
                    <div className='login-content-container'>
                        <Link to='/'>Back</Link>
                        <img className='logo-big' src={logo} alt='logo' />
                        <h2 id='login-top-cont'>Create Account</h2>

                        <div className='form-horizontal'>
                            <div className='form-group'>
                                <div className='col-sm-12'>
                                    <input
                                        type='text'
                                        name='firstName'
                                        className='form-control'
                                        id='tbFirstName'
                                        placeholder='First Name'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='col-sm-12'>
                                    <input
                                        type='text'
                                        name='lastName'
                                        className='form-control'
                                        id='tbLastName'
                                        placeholder='Last Name'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='col-sm-12'>
                                    <input
                                        type='email'
                                        name='email'
                                        className='form-control'
                                        id='tbEmail'
                                        placeholder='Email'
                                        onChange={e => this.handleChange(e)}
                                        onKeyDown={e => this.handleKeyDown(e)} />
                                </div>
                            </div>
                            <div className='form-group'>
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
                                    <button onClick={(e) => this.handleSubmit(e)} className='btn btn-primary login-submit'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    };
}

// const Field = ({ className, type, label, name, value, onChange, onKeyDown }) => (
//     <div className={className}>
//         <label htmlFor={`tb_${name}`}>{label}</label>
//         <input
//             type={type}
//             id={`tb_${name}`}
//             name={name}
//             value={value}
//             onChange={onChange}
//             onKeyDown={onKeyDown} />
//     </div>
// );

const mapStateToProps = state => ({ user: state.userReducer.user, loggedIn: state.userReducer.user.loggedIn });

export default connect(mapStateToProps, { signup })(Signup);