import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs';  /* Functional components */
import '../../css/App.css';                                                            /* CSS */

class ItemDetails extends Component {
    constructor() {
        super();

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.fetchItem = this.fetchItem.bind(this);
        this.state = {
            itemDetails: {},
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.fetchItem()
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

    async fetchItem() {
        const itemDetails = await fetch(`https://fortnite-api.theapinetwork.com/item/get?id=${this.props.match.params.id}`).then(res => res.json())

        this.setState({
            itemDetails: itemDetails.data.item
        });
    }

    render() {
        return (
            <div className='container-fluid spark--main-container backdrop full-height'>
                <PageHeader title='Item Details' url='/shop' />
                <Content>
                    <h1>Item</h1>
                    <h2>Name: {this.state.itemDetails.name}</h2>
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

export default connect(mapStateToProps)(ItemDetails);