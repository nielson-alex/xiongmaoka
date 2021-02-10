import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Content } from '../helpers/functional-components/GlobalSubs';  /* Functional components */
import { decrement, increment } from '../reducers/counterReducer';                  /* Reducer functions */
import '../css/App.css';                                                            /* CSS */

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  handleIncrement = () => this.props.increment();
  handleDecrement = () => this.props.decrement();

  render() {
    return (
      <div className='container-fluid spark--main-container backdrop full-height'>
        <PageHeader title='Counter' />
        <Content>
          <h2>{this.props.count}</h2>
          <button onClick={this.handleIncrement}>+</button>
          <button onClick={this.handleDecrement}>-</button>
        </Content>
      </div>
    );
  };
}

const mapStateToProps = state => ({ count: state.counterReducer.count });

export default connect(mapStateToProps, { decrement, increment })(Counter);
