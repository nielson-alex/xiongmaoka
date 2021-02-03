import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Content } from '../../helpers/functional-components/GlobalSubs';   /* Functional components */
import '../../css/App.css';                                                             /* CSS */

class DatabaseDash extends Component {
    constructor() {
        super();

        this.state = {
            width: 0,
            height: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    render() {
        let bOrM = this.state.width > 768 ? '-big' : '-mini';

        return (
            <div className={`container-fluid spark--main-container backdrop full-height${bOrM}`}>
                <PageHeader title='Database Dashboard' />
                <Content>
                    <ul>
                        <li>
                            <Link key={0} to='/database-dash/post'>Post</Link>
                        </li>
                        <li>
                            <Link key={1} to='/database-dash/get'>Get</Link>
                        </li>
                    </ul>
                </Content>
            </div>
        );
    };
}

export default DatabaseDash;