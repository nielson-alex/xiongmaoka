import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs'   /* Functional components */
import '../../css/App.css';                                                            /* CSS */

class Shop extends Component {
    constructor() {
        super();

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.fetchItems = this.fetchItems.bind(this);
        this.state = {
            items: [],
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.fetchItems();
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

    async fetchItems() {
        const data = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get').then(res => res.json());
        this.setState({
            items: data.data
        });
    }

    render() {
        return (
            <div className='container-fluid spark--main-container backdrop full-height'>
                <PageHeader title='Shop' />
                <Content>
                    {this.state.items.map(item => (
                        <Link key={item.itemId} to={`/shop/${item.itemId}`}>
                            <h2 key={item.itemId}>{item.item.name}</h2>
                        </Link>
                    ))}
                </Content>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(Shop);
