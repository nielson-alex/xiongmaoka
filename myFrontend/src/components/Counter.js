import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Content } from '../helpers/functional-components/GlobalSubs';  /* Functional components */
import { decrement, increment } from '../reducers/counterReducer';                  /* Reducer functions */
import '../css/App.css';                                                            /* CSS */

class Counter extends Component {
  constructor() {
    super();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
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

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  handleIncrement() { this.props.increment(); }
  handleDecrement() { this.props.decrement(); }

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

function mapStateToProps(state) {
  return {
    count: state.counterReducer.count
  };
};

export default connect(mapStateToProps, { decrement, increment })(Counter);
