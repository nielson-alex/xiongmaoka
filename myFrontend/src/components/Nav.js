import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/panda-gray-eyes-02.png';
import OutsideClickHandler from 'react-outside-click-handler';
import { MLink } from '../helpers/functional-components/NavSubs';             /* Functional components */
import { logout } from '../reducers/userReducer';                             /* Reducer Functions */
import { saveCardsToState, saveDecksToState } from '../reducers/deckReducer';
import '../css/App.css';                                                      /* CSS */
import '../css/nav.css';

class Nav extends Component {
  constructor() {
    super();

    this.mobileMenuIcon = React.createRef();
    this.navOptionsRowCont = React.createRef();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.outsideClick = this.outsideClick.bind(this);
    this.menuClick = this.menuClick.bind(this);
    this.handleShowMenu = this.handleShowMenu.bind(this);
    this.state = {
      clickedNavIcon: false,
      navMenuOpen: false,
      showMenu: false,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  async componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  outsideClick() {
    let { current } = this.navOptionsRowCont
    if (this.state.navMenuOpen === false) {
      this.setState({ navMenuOpen: false });
    } else {
      current.classList.add('mobile-hide-nav-options-cont');
      current.classList.remove('mobile-nav-options-cont');
      setTimeout(() => {
        this.setState({ navMenuOpen: false });
      }, 100);
    }
  }

  menuClick() { this.setState({ showMenu: !this.state.showMenu }); }

  handleShowMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  render() {
    if (this.props.user.loggedIn !== true) {
      return <Redirect to='/' />
    } else {
      return this.state.width > 768 ? (
        <nav id='universal-nav' style={{ display: 'block' }}>
          <div className='row'>
            <img className='logo-mini' src={logo} alt='logo' />
            <ul className='nav-links col-11'>
              <Link key={0} to='/home'>
                <li key={0}>Home</li>
              </Link>
              <Link key={1} to='/about'>
                <li key={0}>About</li>
              </Link>
              <Link key={2} to='/flashcards-dash'>
                <li key={0}>Flashcards</li>
              </Link>
              {this.props.user.username === 'anielson' ? (
                <Link key={3} to='/database-dash'>
                  <li key={0}>Database Sandbox</li>
                </Link>
              ) : (
                  <></>
                )}
              <Link key={4} to='/shop'>
                <li key={0}>Shop</li>
              </Link>
              {this.props.user.username === 'anielson' ? (
                <Link key={5} to='/counter'>
                  <li key={0}>Counter</li>
                </Link>
              ) : (
                  <></>
                )}
              {/* <Link key={6} to='/post'>
                <li key={0}>Posts</li>
              </Link> */}
              <Link key={7} to='/weather'>
                <li key={0}>Weather</li>
              </Link>
              <Link key={8} to='/dashboard'>
                <li key={0}>Equinox</li>
              </Link>
              <li>
                |
            </li>
              <Link key={9} to='/'>
                <li key={0} onClick={this.props.logout}>Sign Out</li>
              </Link>
            </ul>
          </div>
        </nav>) : (
          <div className='main-dash-container'>
            <nav id='mobile-top-nav' style={{ backgroundColor: 'slategray' }}>
              <div className='showMobileIconCont' onClick={this.handleShowMenu} style={{ width: '100%', height: '100%', backgroundColor: 'slategray' }}>
                <img className='logo-mini middle-align' src={logo} onClick={this.clickedOnLandingRedirect} alt='Logo' />
              </div>

              <div className={this.state.showMenu !== true ? 'mobile-hide-nav-options-cont' : 'mobile-nav-options-cont'} ref={this.navOptionsRowCont}>
                <OutsideClickHandler onOutsideClick={this.outsideClick}>
                  <MLink to='/home' text='Home' icon='inverted green chart line icon' onClick={this.menuClick} />
                  <MLink to='/about' text='About' icon='menu-icon fas fa-file-alt' onClick={this.menuClick} />
                  <MLink to='/flashcards-dash' text='Flashcards Dashboard' icon='menu-icon fas fa-file-invoice-dollar' onClick={this.menuClick} />
                  {this.props.user.username === 'anielson' ? (
                    <MLink to='/database-dash' text='Database Dashboard' icon='menu-icon fas fa-coins' onClick={this.menuClick} />
                  ) : (
                      <></>
                    )}
                  <MLink to='/shop' text='Store' icon='menu-icon fas fa-box' onClick={this.menuClick} />
                  {this.props.user.username === 'anielson' ? (
                    <MLink to='/counter' text='Counter' icon='menu-icon icon fad fa-calculator' onClick={this.menuClick} />
                  ) : (
                      <></>
                    )}
                  <MLink to='/weather' text='Weather' icon='menu-icon fas fa-print' onClick={this.menuClick} />
                  <Link to='/' onClick={() => { this.props.logout(); this.handleShowMenu(); }}>Sign Out</Link>
                </OutsideClickHandler>
              </div>
            </nav>
          </div>
        );
    };
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps, { logout, saveCardsToState, saveDecksToState })(Nav);
