import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Content } from '../helpers/functional-components/GlobalSubs';  /* Functional components */
import '../css/App.css';                                                                /* CSS */

class Weather extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            weather: 'Not yet gotten',
            weatherC: 'Not yet gotten',
            weatherF: 'Not yet gotten',
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount = () => window.addEventListener('resize', this.updateWindowDimensions);
    componentWillUnmount = () => window.removeEventListener('resize', this.updateWindowDimensions);
    updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight });
    handleGetWeather = () =>
        axios.get('/getWeatherAmericanFork').then(res => {
            this.setState({
                weather: res.data,
                weatherC: res.data.temperature,
                weatherF: (res.data.temperature * 9 / 5) + 32
            });
        });


    render() {
        return (
            <div className='container-fluid spark--main-container backdrop full-height'>
                <PageHeader title='Weather API' />
                <Content>
                    <h2>The weather in American Fork is:
                        {this.state.weather === 'Not yet gotten' ? ('') : (
                            <>
                                <br />{this.state.weatherF}°F
                                <br />{this.state.weatherC}°C
                            </>
                        )}
                    </h2>
                    <br />
                    <button className='btn btn-primary col-10 middle-align btn-lg' onClick={this.handleGetWeather}>Get weather in American Fork</button>
                </Content>
            </div>
        );
    };
}

export default connect()(Weather);